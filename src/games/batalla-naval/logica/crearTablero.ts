import type { Celda, Tablero } from './tipos'

/**
 * Cantidad de filas y columnas que tendrá el tablero.
 *
 * Un tablero de Batalla Naval normalmente es de 10 x 10,
 * por lo que tendrá un total de 100 celdas.
 */
export const TAMANIO_TABLERO = 10

/**
 * Crea una celda nueva para una coordenada específica.
 *
 * Cada llamada devuelve un objeto independiente.
 */
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

/**
 * Crea una matriz vacía de 10 x 10.
 *
 * El arreglo exterior representa las filas.
 * Cada arreglo interior representa las columnas de una fila.
 */
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