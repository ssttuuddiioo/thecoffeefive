import { useCallback, useMemo, useRef, useState } from 'react';
import { useClient } from 'sanity';
import {
  Badge, Box, Button, Card, Container, Flex, Heading, Inline, Spinner, Stack, Text,
} from '@sanity/ui';
import Papa from 'papaparse';
import {
  COLUMNS, EXISTING_LOTS_QUERY, buildNewLot, getPath, parseLotCsvText, planImport,
  prepareRows, toCell, type ImportPlan,
} from '../lib/lot-csv';
import { apiVersion } from '../env';

const ALL_LOTS_QUERY = '*[_type == "greenLot"] | order(order asc, ref asc)';

type Phase =
  | { status: 'idle' }
  | { status: 'reading' }
  | { status: 'invalid'; errors: string[]; fileName: string }
  | { status: 'planned'; plan: ImportPlan; fileName: string; rowCount: number }
  | { status: 'applying' }
  | { status: 'done'; created: number; updated: number }
  | { status: 'error'; message: string };

export function CsvImportTool() {
  const client = useClient({ apiVersion });
  const [phase, setPhase] = useState<Phase>({ status: 'idle' });
  const [exporting, setExporting] = useState(false);
  const fileInput = useRef<HTMLInputElement>(null);

  const preparedRef = useRef<ReturnType<typeof prepareRows>['prepared']>([]);

  const readFile = useCallback(
    async (file: File) => {
      setPhase({ status: 'reading' });
      try {
        const text = await file.text();
        const { prepared, errors } = prepareRows(parseLotCsvText(text));

        if (errors.length > 0) {
          setPhase({ status: 'invalid', errors, fileName: file.name });
          return;
        }

        const existing = await client.fetch<Record<string, unknown>[]>(EXISTING_LOTS_QUERY, {
          refs: prepared.map((r) => r.ref),
        });
        preparedRef.current = prepared;
        setPhase({
          status: 'planned',
          plan: planImport(prepared, existing),
          fileName: file.name,
          rowCount: prepared.length,
        });
      } catch (error) {
        setPhase({ status: 'error', message: error instanceof Error ? error.message : String(error) });
      }
    },
    [client],
  );

  const apply = useCallback(async () => {
    if (phase.status !== 'planned') return;
    setPhase({ status: 'applying' });
    try {
      const tx = client.transaction();
      for (const row of phase.plan.creates) tx.create(buildNewLot(row));
      // Slug is deliberately not patched — renaming a lot must not change its URL.
      for (const { id, row } of phase.plan.updates) tx.patch(id, { set: row.fields });
      await tx.commit();
      setPhase({
        status: 'done',
        created: phase.plan.creates.length,
        updated: phase.plan.updates.length,
      });
    } catch (error) {
      setPhase({ status: 'error', message: error instanceof Error ? error.message : String(error) });
    }
  }, [client, phase]);

  const exportCsv = useCallback(async () => {
    setExporting(true);
    try {
      const docs = await client.fetch<Record<string, unknown>[]>(ALL_LOTS_QUERY);
      const rows = docs.map((doc) => {
        const row: Record<string, string> = {};
        for (const column of COLUMNS) row[column.header] = toCell(getPath(doc, column.path));
        return row;
      });
      const csv = Papa.unparse(rows, { columns: COLUMNS.map((c) => c.header) });
      const url = URL.createObjectURL(new Blob([csv], { type: 'text/csv;charset=utf-8;' }));
      const a = document.createElement('a');
      a.href = url;
      a.download = `lotes-${new Date().toISOString().slice(0, 10)}.csv`;
      a.click();
      URL.revokeObjectURL(url);
    } finally {
      setExporting(false);
    }
  }, [client]);

  const reset = () => {
    preparedRef.current = [];
    if (fileInput.current) fileInput.current.value = '';
    setPhase({ status: 'idle' });
  };

  const onPick = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) readFile(file);
  };

  const onDrop = (event: React.DragEvent) => {
    event.preventDefault();
    const file = event.dataTransfer.files?.[0];
    if (file) readFile(file);
  };

  const busy = phase.status === 'reading' || phase.status === 'applying';

  return (
    <Container width={2} paddingX={4} paddingY={5}>
      <Stack space={5}>
        <Stack space={3}>
          <Heading size={3}>Importar lotes desde CSV</Heading>
          <Text size={1} muted>
            Descarga los lotes actuales, edítalos en Excel o Google Sheets, y vuelve a
            subir el archivo. Se emparejan por <strong>referencia</strong>: las filas
            existentes se actualizan, las nuevas se crean. Nunca se borra nada, y las
            fotos no se tocan.
          </Text>
        </Stack>

        <Flex gap={3}>
          <Button
            mode="ghost"
            text={exporting ? 'Descargando…' : '1 · Descargar CSV actual'}
            disabled={exporting || busy}
            onClick={exportCsv}
          />
          <Button
            mode="ghost"
            text="2 · Elegir archivo…"
            disabled={busy}
            onClick={() => fileInput.current?.click()}
          />
        </Flex>

        <input
          ref={fileInput}
          type="file"
          accept=".csv,text/csv"
          onChange={onPick}
          style={{ display: 'none' }}
        />

        {(phase.status === 'idle' || phase.status === 'reading') && (
          <Card
            padding={5}
            radius={2}
            tone="transparent"
            border
            style={{ borderStyle: 'dashed', textAlign: 'center' }}
            onDragOver={(e) => e.preventDefault()}
            onDrop={onDrop}
          >
            {phase.status === 'reading' ? (
              <Flex align="center" justify="center" gap={3}>
                <Spinner muted />
                <Text muted>Leyendo el archivo…</Text>
              </Flex>
            ) : (
              <Text muted>Arrastra aquí el archivo .csv</Text>
            )}
          </Card>
        )}

        {phase.status === 'invalid' && (
          <Card padding={4} radius={2} tone="critical" border>
            <Stack space={4}>
              <Text weight="semibold">
                {phase.errors.length} error{phase.errors.length === 1 ? '' : 'es'} en {phase.fileName} — no se importó nada
              </Text>
              <Stack space={2}>
                {phase.errors.slice(0, 20).map((error, i) => (
                  <Text key={i} size={1}>• {error}</Text>
                ))}
                {phase.errors.length > 20 && (
                  <Text size={1} muted>… y {phase.errors.length - 20} más</Text>
                )}
              </Stack>
              <Box>
                <Button mode="ghost" text="Elegir otro archivo" onClick={reset} />
              </Box>
            </Stack>
          </Card>
        )}

        {phase.status === 'planned' && (
          <Stack space={4}>
            <Card padding={4} radius={2} tone="primary" border>
              <Stack space={3}>
                <Text weight="semibold">{phase.fileName} — {phase.rowCount} filas</Text>
                <Inline space={2}>
                  <Badge tone="positive">{phase.plan.creates.length} para crear</Badge>
                  <Badge tone="caution">{phase.plan.updates.length} para actualizar</Badge>
                  <Badge tone="default">{phase.plan.unchanged} sin cambios</Badge>
                </Inline>
              </Stack>
            </Card>

            {phase.plan.creates.map((row) => (
              <Card key={row.ref} padding={3} radius={2} tone="positive" border>
                <Text size={1}>
                  <strong>CREAR</strong>  {row.ref} · {row.name}
                </Text>
              </Card>
            ))}

            {phase.plan.updates.map(({ row, changes }) => (
              <Card key={row.ref} padding={3} radius={2} tone="caution" border>
                <Stack space={3}>
                  <Text size={1}>
                    <strong>ACTUALIZAR</strong>  {row.ref} · {row.name}
                  </Text>
                  <Stack space={2}>
                    {changes.map((c) => (
                      <Text key={c.path} size={1} muted>
                        {c.path}: {c.from || '—'} → <strong>{c.to}</strong>
                      </Text>
                    ))}
                  </Stack>
                </Stack>
              </Card>
            ))}

            <Flex gap={3}>
              <Button
                tone="primary"
                text={`Aplicar ${phase.plan.creates.length + phase.plan.updates.length} cambios`}
                disabled={phase.plan.creates.length + phase.plan.updates.length === 0}
                onClick={apply}
              />
              <Button mode="ghost" text="Cancelar" onClick={reset} />
            </Flex>
          </Stack>
        )}

        {phase.status === 'applying' && (
          <Card padding={5} radius={2} tone="transparent" border>
            <Flex align="center" justify="center" gap={3}>
              <Spinner muted />
              <Text muted>Guardando…</Text>
            </Flex>
          </Card>
        )}

        {phase.status === 'done' && (
          <Card padding={4} radius={2} tone="positive" border>
            <Stack space={4}>
              <Text weight="semibold">
                Listo: {phase.created} creado{phase.created === 1 ? '' : 's'}, {phase.updated} actualizado{phase.updated === 1 ? '' : 's'}.
              </Text>
              <Text size={1} muted>
                Los cambios aparecen en la página en menos de un minuto.
              </Text>
              <Box>
                <Button mode="ghost" text="Importar otro archivo" onClick={reset} />
              </Box>
            </Stack>
          </Card>
        )}

        {phase.status === 'error' && (
          <Card padding={4} radius={2} tone="critical" border>
            <Stack space={4}>
              <Text weight="semibold">No se pudo completar</Text>
              <Text size={1}>{phase.message}</Text>
              <Box>
                <Button mode="ghost" text="Empezar de nuevo" onClick={reset} />
              </Box>
            </Stack>
          </Card>
        )}
      </Stack>
    </Container>
  );
}
