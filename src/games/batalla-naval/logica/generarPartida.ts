import type {
  Barco,
  Coordenada,
  Orientacion,
  Tablero,
} from './tipos'

import {
  crearTableroVacio,
  TAMANIO_TABLERO,
} from './crearTablero'

import { CONFIGURACION_BARCOS } from './configuracionBarcos'
import { colocarBarco } from './colocarBarco'

interface PartidaGenerada {
  tablero: Tablero
  barcos: Barco[]
}

function generarNumeroAleatorio(limite: number): number {
  return Math.floor(Math.random() * limite)
}

function generarCoordenadaAleatoria(): Coordenada {
  return {
    fila: generarNumeroAleatorio(TAMANIO_TABLERO),
    columna: generarNumeroAleatorio(TAMANIO_TABLERO),
  }
}

function generarOrientacionAleatoria(): Orientacion {
  return Math.random() < 0.5
    ? 'horizontal'
    : 'vertical'
}

export function generarPartida(): PartidaGenerada {
  let tablero = crearTableroVacio()
  const barcos: Barco[] = []

  CONFIGURACION_BARCOS.forEach((configuracion) => {
    let barcoColocado = false
    let intentos = 0

    while (!barcoColocado && intentos < 1000) {
      intentos += 1

      const resultado = colocarBarco(
        tablero,
        configuracion,
        generarCoordenadaAleatoria(),
        generarOrientacionAleatoria(),
      )

      if (resultado !== null) {
        tablero = resultado.tablero
        barcos.push(resultado.barco)
        barcoColocado = true
      }
    }

    if (!barcoColocado) {
      throw new Error(
        `No se pudo colocar el barco ${configuracion.nombre}.`,
      )
    }
  })

  return {
    tablero,
    barcos,
  }
}
