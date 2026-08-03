import { useState } from 'react'

import { useLocalStorage } from '../../../hooks/useLocalStorage'

import type {
  Coordenada,
  EstadoBatallaNaval,
  EstadisticasBatallaNaval,
} from '../logica/tipos'

import { generarPartida } from '../logica/generarPartida'
import { procesarDisparo } from '../logica/procesarDisparo'

const ESTADISTICAS_INICIALES: EstadisticasBatallaNaval = {
  victorias: 0,
  mejorCantidadDisparos: null,
}

function crearEstadoInicial(): EstadoBatallaNaval {
  const partida = generarPartida()

  return {
    tablero: partida.tablero,
    barcos: partida.barcos,
    disparos: 0,
    aciertos: 0,
    estadoPartida: 'jugando',
    mensaje: 'Selecciona una coordenada para disparar.',
  }
}

export function useBatallaNaval() {
  const [partida, setPartida] =
    useState<EstadoBatallaNaval>(crearEstadoInicial)

  const {
    valor: estadisticas,
    guardar: guardarEstadisticas,
  } = useLocalStorage<EstadisticasBatallaNaval>(
    'batalla-naval-estadisticas',
    ESTADISTICAS_INICIALES,
  )

  function disparar(coordenada: Coordenada): void {
    if (partida.estadoPartida === 'ganada') {
      return
    }

    const resultado = procesarDisparo(
      partida.tablero,
      partida.barcos,
      coordenada,
    )

    if (resultado.tipo === 'repetido') {
      setPartida({
        ...partida,
        mensaje: resultado.mensaje,
      })

      return
    }

    const nuevosDisparos = partida.disparos + 1
    const nuevosAciertos =
      partida.aciertos + (resultado.fueAcierto ? 1 : 0)

    setPartida({
      tablero: resultado.tablero,
      barcos: resultado.barcos,
      disparos: nuevosDisparos,
      aciertos: nuevosAciertos,
      estadoPartida: resultado.victoria
        ? 'ganada'
        : 'jugando',
      mensaje: resultado.victoria
        ? `¡Victoria en ${nuevosDisparos} disparos!`
        : resultado.mensaje,
    })

    if (resultado.victoria) {
      const mejorCantidadDisparos =
        estadisticas.mejorCantidadDisparos === null
          ? nuevosDisparos
          : Math.min(
              estadisticas.mejorCantidadDisparos,
              nuevosDisparos,
            )

      guardarEstadisticas({
        victorias: estadisticas.victorias + 1,
        mejorCantidadDisparos,
      })
    }
  }

  function nuevaPartida(): void {
    setPartida(crearEstadoInicial())
  }

  return {
    ...partida,
    estadisticas,
    disparar,
    nuevaPartida,
  }
}
