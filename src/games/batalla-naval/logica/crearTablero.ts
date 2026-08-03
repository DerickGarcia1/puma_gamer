import type { Celda, Tablero } from './tipos'

export const TAMANIO_TABLERO = 10

function crearCelda(fila: number, columna: number): Celda {
  return {
    coordenada: {
      fila,
      columna,
    },
    barcoId: null,
    estadoDisparo: 'sin-disparo',
  }
}

export function crearTableroVacio(): Tablero {
  return Array.from(
    { length: TAMANIO_TABLERO },
    (_, fila) =>
      Array.from(
        { length: TAMANIO_TABLERO },
        (_, columna) => crearCelda(fila, columna),
      ),
  )
}
