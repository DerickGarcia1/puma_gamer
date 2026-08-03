import type {
  Barco,
  Coordenada,
  ResultadoDisparo,
  Tablero,
} from './tipos'

import { estaDentroDelTablero } from './validarPosiciones'

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

function copiarBarcos(barcos: Barco[]): Barco[] {
  return barcos.map((barco) => ({
    ...barco,
    posiciones: barco.posiciones.map((posicion) => ({
      ...posicion,
    })),
  }))
}

function convertirCoordenadaATexto(
  coordenada: Coordenada,
): string {
  const letra = String.fromCharCode(
    65 + coordenada.columna,
  )

  return `${letra}${coordenada.fila + 1}`
}

export function procesarDisparo(
  tablero: Tablero,
  barcos: Barco[],
  coordenada: Coordenada,
): ResultadoDisparo {
  if (!estaDentroDelTablero(coordenada)) {
    throw new Error('La coordenada está fuera del tablero.')
  }

  const celdaSeleccionada =
    tablero[coordenada.fila][coordenada.columna]

  const coordenadaTexto =
    convertirCoordenadaATexto(coordenada)

  if (celdaSeleccionada.estadoDisparo !== 'sin-disparo') {
    return {
      tablero,
      barcos,
      tipo: 'repetido',
      mensaje: `Ya disparaste en ${coordenadaTexto}.`,
      fueAcierto: false,
      victoria: false,
    }
  }

  const tableroActualizado = copiarTablero(tablero)
  const barcosActualizados = copiarBarcos(barcos)

  const celdaActualizada =
    tableroActualizado[coordenada.fila][coordenada.columna]

  if (celdaActualizada.barcoId === null) {
    celdaActualizada.estadoDisparo = 'agua'

    return {
      tablero: tableroActualizado,
      barcos: barcosActualizados,
      tipo: 'agua',
      mensaje: `Agua en ${coordenadaTexto}.`,
      fueAcierto: false,
      victoria: false,
    }
  }

  const indiceBarco = barcosActualizados.findIndex(
    (barco) => barco.id === celdaActualizada.barcoId,
  )

  if (indiceBarco === -1) {
    throw new Error('No se encontró el barco impactado.')
  }

  const barcoImpactado = barcosActualizados[indiceBarco]
  const nuevosImpactos = barcoImpactado.impactos + 1
  const fueHundido =
    nuevosImpactos >= barcoImpactado.longitud

  barcosActualizados[indiceBarco] = {
    ...barcoImpactado,
    impactos: nuevosImpactos,
    hundido: fueHundido,
  }

  if (fueHundido) {
    barcoImpactado.posiciones.forEach(
      ({ fila, columna }) => {
        tableroActualizado[fila][columna].estadoDisparo =
          'hundido'
      },
    )
  } else {
    celdaActualizada.estadoDisparo = 'tocado'
  }

  const victoria = barcosActualizados.every(
    (barco) => barco.hundido,
  )

  return {
    tablero: tableroActualizado,
    barcos: barcosActualizados,
    tipo: fueHundido ? 'hundido' : 'tocado',
    mensaje: victoria
      ? '¡Victoria! Hundiste toda la flota enemiga.'
      : fueHundido
        ? `¡Hundiste el ${barcoImpactado.nombre}!`
        : `¡Tocado en ${coordenadaTexto}!`,
    fueAcierto: true,
    victoria,
  }
}
