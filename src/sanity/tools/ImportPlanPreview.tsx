import { useState } from 'react';
import { Badge, Box, Button, Card, Flex, Inline, Stack, Text } from '@sanity/ui';
import { ChevronDownIcon, ChevronRightIcon } from '@sanity/icons';
import { UBICACION_VALUES } from '../schemas/documents/greenLot';
import { getPath, type FieldChange, type ImportPlan, type PreparedRow } from '../lib/lot-csv';

/** Changes a buyer would notice first; they get a badge on the collapsed row. */
const KEY_FIELDS = ['name', 'proceso', 'price', 'weight', 'ubicacion', 'bodega', 'disponible'];

function displayValue(path: string, value: string): string {
  if (value === '') return '—';
  if (path === 'ubicacion') return UBICACION_VALUES.find((u) => u.value === value)?.title ?? value;
  if (path === 'disponible') return value === 'true' ? 'Sí' : 'No (oculto)';
  return value;
}

function summarizeNewLot(row: PreparedRow): string {
  const place = getPath(row.fields, 'bodega') ?? getPath(row.fields, 'ubicacion');
  return [getPath(row.fields, 'proceso'), getPath(row.fields, 'price'), getPath(row.fields, 'weight'), place]
    .filter(Boolean)
    .join('  ·  ');
}

const muted = 'var(--card-muted-fg-color)';

function ShortChanges({ changes }: { changes: FieldChange[] }) {
  return (
    <Box
      style={{
        display: 'grid',
        gridTemplateColumns: 'minmax(110px, auto) 1fr 1fr',
        columnGap: 16,
        rowGap: 10,
        alignItems: 'baseline',
      }}
    >
      <Text size={0} muted weight="semibold">CAMPO</Text>
      <Text size={0} muted weight="semibold">ANTES</Text>
      <Text size={0} muted weight="semibold">AHORA</Text>
      {changes.map((c) => (
        <Row key={c.path} change={c} />
      ))}
    </Box>
  );
}

function Row({ change }: { change: FieldChange }) {
  return (
    <>
      <Text size={1} muted>{change.label}</Text>
      <Text size={1} style={{ color: muted, textDecoration: change.from ? 'line-through' : undefined }}>
        {displayValue(change.path, change.from)}
      </Text>
      <Text size={1} weight="semibold">{displayValue(change.path, change.to)}</Text>
    </>
  );
}

function LongChange({ change }: { change: FieldChange }) {
  return (
    <Stack space={2}>
      <Text size={1} muted weight="semibold">{change.label}</Text>
      {change.from && (
        <Text size={1} style={{ color: muted, textDecoration: 'line-through' }}>
          {change.from}
        </Text>
      )}
      <Text size={1}>{change.to}</Text>
    </Stack>
  );
}

function UpdateCard({
  row,
  changes,
  open,
  onToggle,
}: {
  row: PreparedRow;
  changes: FieldChange[];
  open: boolean;
  onToggle: () => void;
}) {
  const short = changes.filter((c) => !c.long);
  const long = changes.filter((c) => c.long);
  const keyChanges = changes.filter((c) => KEY_FIELDS.includes(c.path));

  return (
    <Card radius={2} border tone="default">
      <Card
        as="button"
        type="button"
        padding={3}
        radius={2}
        onClick={onToggle}
        style={{ width: '100%', textAlign: 'left', cursor: 'pointer', background: 'transparent' }}
      >
        <Flex align="center" gap={3}>
          <Text size={1} muted>{open ? <ChevronDownIcon /> : <ChevronRightIcon />}</Text>
          <Box flex={1}>
            <Stack space={2}>
              <Text size={1} weight="semibold">
                {row.ref} · {row.name}
              </Text>
              {keyChanges.length > 0 && (
                <Inline space={1}>
                  {keyChanges.map((c) => (
                    <Badge key={c.path} tone="caution" fontSize={0}>{c.label}</Badge>
                  ))}
                </Inline>
              )}
            </Stack>
          </Box>
          <Text size={1} muted>
            {changes.length} cambio{changes.length === 1 ? '' : 's'}
          </Text>
        </Flex>
      </Card>

      {open && (
        <Box paddingX={4} paddingBottom={4} paddingTop={2}>
          <Stack space={5}>
            {short.length > 0 && <ShortChanges changes={short} />}
            {long.length > 0 && (
              <Stack space={4}>
                <Text size={0} muted weight="semibold">TEXTOS</Text>
                {long.map((c) => (
                  <LongChange key={c.path} change={c} />
                ))}
              </Stack>
            )}
          </Stack>
        </Box>
      )}
    </Card>
  );
}

export function ImportPlanPreview({
  plan,
  fileName,
  rowCount,
}: {
  plan: ImportPlan;
  fileName: string;
  rowCount: number;
}) {
  const [openRefs, setOpenRefs] = useState<Set<string>>(new Set());
  const allOpen = plan.updates.length > 0 && openRefs.size === plan.updates.length;

  const toggle = (ref: string) =>
    setOpenRefs((prev) => {
      const next = new Set(prev);
      if (next.has(ref)) next.delete(ref);
      else next.add(ref);
      return next;
    });

  const toggleAll = () =>
    setOpenRefs(allOpen ? new Set() : new Set(plan.updates.map((u) => u.row.ref)));

  return (
    <Stack space={5}>
      <Card padding={4} radius={2} tone="primary" border>
        <Stack space={3}>
          <Text weight="semibold">{fileName} · {rowCount} filas</Text>
          <Inline space={2}>
            <Badge tone="positive">{plan.creates.length} nuevos</Badge>
            <Badge tone="caution">{plan.updates.length} con cambios</Badge>
            <Badge tone="default">{plan.unchanged} sin cambios</Badge>
          </Inline>
          <Text size={1} muted>Todavía no se ha guardado nada.</Text>
        </Stack>
      </Card>

      {plan.creates.length > 0 && (
        <Stack space={3}>
          <Text size={1} weight="semibold">Lotes nuevos</Text>
          <Card radius={2} border tone="positive">
            <Stack>
              {plan.creates.map((row, i) => (
                <Box
                  key={row.ref}
                  padding={3}
                  style={i > 0 ? { borderTop: '1px solid var(--card-border-color)' } : undefined}
                >
                  <Stack space={2}>
                    <Text size={1} weight="semibold">{row.ref} · {row.name}</Text>
                    <Text size={1} muted>{summarizeNewLot(row)}</Text>
                  </Stack>
                </Box>
              ))}
            </Stack>
          </Card>
        </Stack>
      )}

      {plan.updates.length > 0 && (
        <Stack space={3}>
          <Flex align="center" justify="space-between">
            <Text size={1} weight="semibold">Lotes que cambian</Text>
            <Button
              mode="bleed"
              fontSize={1}
              padding={2}
              text={allOpen ? 'Cerrar todos' : 'Abrir todos'}
              onClick={toggleAll}
            />
          </Flex>
          {plan.updates.map(({ row, changes }) => (
            <UpdateCard
              key={row.ref}
              row={row}
              changes={changes}
              open={openRefs.has(row.ref)}
              onToggle={() => toggle(row.ref)}
            />
          ))}
        </Stack>
      )}
    </Stack>
  );
}
