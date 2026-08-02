import { useState } from 'react'
import type { Tablero, EstadoPumaFour, EstadoJuego } from '../logica/tipos'
import {
  crearTableroVacio,
  crearPilasColumnas,
  soltarFicha,
  hayVictoria,
  tableroLleno,
} from '../logica/tablero'
import { useLocalStorage } from '../../../hooks/useLocalStorage'

interface Victorias {
  jugador1: number
  jugador2: number
}

function crearEstadoInicial(): EstadoPumaFour {
  return {
    tablero: crearTableroVacio(),
    pilasColumnas: crearPilasColumnas(),
    turnoActual: 'jugador1',
    estado: 'jugando',
  }
}

// Crea una copia nueva del tablero, fila por fila,
// para que React detecte el cambio y vuelva a dibujar
function clonarTablero(tablero: Tablero): Tablero {
  return tablero.map((fila) => [...fila])
}

export function usePumaFour() {
  const [estadoJuego, setEstadoJuego] = useState<EstadoPumaFour>(crearEstadoInicial())

  const { valor: victorias, guardar: guardarVictorias } = useLocalStorage<Victorias>(
    'puma-four-victorias',
    { jugador1: 0, jugador2: 0 }
  )

  function jugarColumna(columna: number): void {
    if (estadoJuego.estado !== 'jugando') {
      return
    }

    const jugadorActual = estadoJuego.turnoActual

    const resultado = soltarFicha(
      estadoJuego.tablero,
      estadoJuego.pilasColumnas,
      columna,
      jugadorActual
    )

    if (!resultado.exito) {
      return
    }

    const tableroActualizado = clonarTablero(estadoJuego.tablero)

    const gano = hayVictoria(tableroActualizado, resultado.fila, resultado.columna, jugadorActual)

    if (gano) {
      const nuevoEstado: EstadoJuego = jugadorActual === 'jugador1' ? 'ganoJugador1' : 'ganoJugador2'

      setEstadoJuego({
        tablero: tableroActualizado,
        pilasColumnas: estadoJuego.pilasColumnas,
        turnoActual: jugadorActual,
        estado: nuevoEstado,
      })

      guardarVictorias({
        ...victorias,
        [jugadorActual]: victorias[jugadorActual] + 1,
      })

      return
    }

    if (tableroLleno(estadoJuego.pilasColumnas)) {
      setEstadoJuego({
        tablero: tableroActualizado,
        pilasColumnas: estadoJuego.pilasColumnas,
        turnoActual: jugadorActual,
        estado: 'empate',
      })
      return
    }

    const siguienteTurno: 'jugador1' | 'jugador2' =
      jugadorActual === 'jugador1' ? 'jugador2' : 'jugador1'

    setEstadoJuego({
      tablero: tableroActualizado,
      pilasColumnas: estadoJuego.pilasColumnas,
      turnoActual: siguienteTurno,
      estado: 'jugando',
    })
  }

  function reiniciarPartida(): void {
    setEstadoJuego(crearEstadoInicial())
  }

  return {
    estadoJuego,
    victorias,
    jugarColumna,
    reiniciarPartida,
  }
}