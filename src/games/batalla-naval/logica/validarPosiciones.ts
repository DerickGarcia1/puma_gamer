import type { Coordenada, Tablero } from './tipos'
import { TAMANIO_TABLERO } from './crearTablero'

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

export function estanCeldasDisponibles(
  tablero: Tablero,
  posiciones: Coordenada[],
): boolean {
  return posiciones.every(
    ({ fila, columna }) =>
      tablero[fila][columna].barcoId === null,
  )
}

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
