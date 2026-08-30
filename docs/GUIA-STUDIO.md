# Guía del Studio — Café Verde

Todo el contenido del sitio se edita en **coffeefive.com/studio**.
Los cambios aparecen en la página en menos de un minuto.

---

## Buscar un lote

En la barra lateral: **Café verde**. Está dividido para no tener que buscar en
una lista larga:

- **Todos los lotes**
- **Disponibles** — lo que se ve ahora en la página
- **Ocultos** — lo agotado, guardado por si vuelve
- **En Colombia** · **En tránsito** · **Landed in US**

Cada lote muestra su foto, referencia, proceso, precio, cantidad y ubicación,
para reconocerlo sin abrirlo.

---

## Cambiar un precio

1. Abre el lote.
2. Pestaña **Comercial** → campo **Precio**.
3. **Publish** (arriba a la derecha).

El precio es texto libre: `$12.50/lb`, `NYSE +$1.20/lb`, lo que necesites.

---

## Marcar un lote como agotado

Abre el lote → pestaña **General** → desmarca **Disponible** → **Publish**.

Desaparece de la lista pero **no se borra**: el lote, sus fotos y sus datos
quedan guardados. Si vuelve a haber café, lo marcas de nuevo y reaparece.

> **No uses Delete para un lote agotado.** Borrar es inmediato y no se puede
> deshacer. Desmarcar *Disponible* hace lo mismo de cara al comprador y es
> reversible.

---

## Agregar un lote nuevo

La forma más rápida es **duplicar** uno parecido: abre un lote similar → menú de
tres puntos abajo → **Duplicate** → cambia lo que sea distinto.

O desde cero: **Café verde → Todos los lotes → +**

Campos obligatorios para poder publicar:

| Campo | Ejemplo |
|---|---|
| Referencia | `HS-009` — dos letras, guion, tres números |
| Nombre | `Sidra Natural` |
| Proceso | Lavado · Natural · Honey · Anaeróbico · Fermentado |
| Precio | `$16/lb` |
| Cantidad | `300 lbs` |
| Ubicación | En Colombia · En tránsito · Landed in US |

**La referencia debe ser única.** Si repites una, el Studio te avisa y te dice
con cuál choca. `HS-` para especialidad, `RG-` para comercial.

El resto (variedad, finca, altura, humedad, densidad…) es opcional: lo que
llenes se muestra, lo que dejes vacío no aparece.

---

## Fotos

Pestaña **Contenido** → **Fotos**. La **primera** es la que sale en la tarjeta
de la lista. Arrastra para reordenarlas.

---

## Textos en dos idiomas

Los campos de texto largo tienen **Español** e **Inglés**. El español es el
principal: si dejas el inglés vacío, la página en inglés muestra el español en
vez de quedarse en blanco.

---

## Lo que conviene no tocar

- **URL (slug)** — se genera del nombre. Si ya le mandaste el enlace del lote a
  un comprador, cambiarlo lo rompe.
- **Referencia**, después de publicar — es la llave con la que se emparejan los
  lotes al importar desde Excel.

---

## Muchos lotes a la vez — Importar CSV

Cuando llega un contenedor o hay que mover precios de toda una cosecha, no vale
la pena entrar lote por lote. Arriba en el Studio hay una pestaña
**Importar CSV**:

1. **Descargar CSV actual** — baja todos los lotes como archivo.
2. Ábrelo en **Excel** o **Google Sheets**. Cambia precios, cantidades, marca
   agotados (`disponible` = `false`), o agrega filas nuevas abajo.
3. Guarda o exporta como **CSV**.
4. Vuelve al Studio y arrastra el archivo, o usa **Elegir archivo**.
5. El Studio te muestra **exactamente qué va a cambiar** antes de tocar nada:
   qué lotes se crean, qué campos se modifican y con qué valores.
6. **Aplicar cambios.**

Reglas:

- Los lotes se emparejan por **referencia** (`HS-001`). Si la referencia ya
  existe, se actualiza; si es nueva, se crea el lote.
- **Solo se tocan las columnas del archivo.** Las fotos y todo lo demás quedan
  intactos.
- **Nunca borra.** Si quitas una fila del archivo, ese lote sigue igual. Para
  bajar un lote de la lista, pon `disponible` en `false`.
- Si el archivo tiene un error (una referencia mal escrita, un proceso que no
  existe), te dice cuál y en qué fila, y **no importa nada** — nunca queda a
  medias.

Las fotos son lo único que no se puede subir por CSV: eso se hace lote por lote
en la pestaña **Contenido**.
