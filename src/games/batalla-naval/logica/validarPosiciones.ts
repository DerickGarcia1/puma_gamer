import type { Coordenada, Tablero } from './tipos'
import { TAMANIO_TABLERO } from './crearTablero'

/**
 * Comprueba si una coordenada se encuentra
 * dentro de los límites del tablero.
 */
export function estaDentroDelTablero(
  coordenada: Coordenada,
): boolean {
  return (
    coordenada.fila >= 0 &&
    coordenada.fila < TAMANIO_TABLERO &&
    coordenada.columna >= 0 &&
    coordenada.columna < TAMANIO_TABLERO
  )
}

/**
 * Comprueba si todas las coordenadas están libres.
 *
 * Esta función asume que las coordenadas ya fueron
 * validadas y se encuentran dentro del tablero.
 */
export function estanCeldasDisponibles(
  tablero: Tablero,
  posiciones: Coordenada[],
): boolean {
  return posiciones.every(
    ({ fila, columna }) =>
      tablero[fila][columna].barcoId === null,
  )
}

/**
 * Comprueba si un barco puede colocarse en las
 * coordenadas proporcionadas.
 *
 * Para ser válido:
 * 1. Todas sus posiciones deben estar dentro del tablero.
 * 2. Todas las celdas deben estar desocupadas.
 */
export function sePuedeColocarBarco(
  tablero: Tablero,
  posiciones: Coordenada[],
): boolean {
  const posicionesValidas = posiciones.every(
    estaDentroDelTablero,
  )

  if (!posicionesValidas) {
    return false
  }

  return estanCeldasDisponibles(tablero, posiciones)
}