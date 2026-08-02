import GameLayout from '../components/GameLayout'
import { usePumaFour } from '../games/puma-four/hooks/usePumaFour'
import '../games/puma-four/PumaFour.css'

function PumaFour() {
  const { estadoJuego, victorias, jugarColumna, reiniciarPartida } = usePumaFour()

  function obtenerMensajeEstado(): string {
    if (estadoJuego.estado === 'ganoJugador1') {
      return '¡Ganó el Jugador 1!'
    }
    if (estadoJuego.estado === 'ganoJugador2') {
      return '¡Ganó el Jugador 2!'
    }
    if (estadoJuego.estado === 'empate') {
      return 'Empate, el tablero se llenó'
    }
    return estadoJuego.turnoActual === 'jugador1' ? 'Turno del Jugador 1' : 'Turno del Jugador 2'
  }

  return (
    <GameLayout title="Puma Four">
      <div className="puma-four">
        <p className="puma-four__marcador">
          Jugador 1: {victorias.jugador1} &nbsp;|&nbsp; Jugador 2: {victorias.jugador2}
        </p>

        <p className="puma-four__estado">{obtenerMensajeEstado()}</p>

        <div className="puma-four__tablero">
          {estadoJuego.tablero.map((fila, indiceFila) => (
            <div className="puma-four__fila" key={indiceFila}>
              {fila.map((celda, indiceColumna) => (
                <button
                  key={indiceColumna}
                  className={`puma-four__celda puma-four__celda--${celda ?? 'vacia'}`}
                  onClick={() => jugarColumna(indiceColumna)}
                  disabled={estadoJuego.estado !== 'jugando'}
                  aria-label={`Jugar en columna ${indiceColumna + 1}`}
                />
              ))}
            </div>
          ))}
        </div>

        <button className="puma-four__reiniciar" onClick={reiniciarPartida}>
          Reiniciar partida
        </button>
      </div>
    </GameLayout>
  )
}

export default PumaFour