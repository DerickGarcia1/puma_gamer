import type {
  Barco,
  ConfiguracionBarco,
  Coordenada,
  Orientacion,
  ResultadoColocacionBarco,
  Tablero,
} from './tipos'

import { calcularPosicionesBarco } from './calcularPosiciones'
import { sePuedeColocarBarco } from './validarPosiciones'

function copiarTablero(tablero: Tablero): Tablero {
  return tablero.map((fila) =>
    fila.map((celda) => ({
      ...celda,
      coordenada: {
        ...celda.coordenada,
      },
    })),
  )
}

export function colocarBarco(
  tablero: Tablero,
  configuracion: ConfiguracionBarco,
  coordenadaInicial: Coordenada,
  orientacion: Orientacion,
): ResultadoColocacionBarco | null {
  const posiciones = calcularPosicionesBarco(
    coordenadaInicial,
    configuracion.longitud,
    orientacion,
  )

  if (!sePuedeColocarBarco(tablero, posiciones)) {
    return null
  }

  const tableroActualizado = copiarTablero(tablero)

  posiciones.forEach(({ fila, columna }) => {
    tableroActualizado[fila][columna].barcoId =
      configuracion.id
  })

  const barco: Barco = {
    id: configuracion.id,
    nombre: configuracion.nombre,
    longitud: configuracion.longitud,
    orientacion,
    posiciones,
    impactos: 0,
    hundido: false,
  }

  return {
    tablero: tableroActualizado,
    barco,
  }
}
