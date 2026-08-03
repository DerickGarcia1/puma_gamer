import GameLayout from '../components/GameLayout'

import { useBatallaNaval } from '../games/batalla-naval/hooks/useBatallaNaval'
import { TAMANIO_TABLERO } from '../games/batalla-naval/logica/crearTablero'

import type {
  Celda,
  EstadoDisparo,
} from '../games/batalla-naval/logica/tipos'

import '../games/batalla-naval/BatallaNaval.css'

const LETRAS_COLUMNAS = Array.from(
  { length: TAMANIO_TABLERO },
  (_, indice) => String.fromCharCode(65 + indice),
)

function obtenerContenidoCelda(
  estado: EstadoDisparo,
): string {
  if (estado === 'agua') {
    return '•'
  }

  if (estado === 'tocado' || estado === 'hundido') {
    return 'X'
  }

  return ''
}

function obtenerClaseCelda(celda: Celda): string {
  const clases = ['batalla-naval__celda']

  if (celda.estadoDisparo !== 'sin-disparo') {
    clases.push(
      `batalla-naval__celda--${celda.estadoDisparo}`,
    )
  }

  return clases.join(' ')
}

function BatallaNaval() {
  const {
    tablero,
    barcos,
    disparos,
    aciertos,
    estadoPartida,
    mensaje,
    estadisticas,
    disparar,
    nuevaPartida,
  } = useBatallaNaval()

  const eficiencia =
    disparos === 0
      ? 0
      : Math.round((aciertos / disparos) * 100)

  return (
    <GameLayout title="Batalla Naval">
      <section className="batalla-naval">
        <div className="batalla-naval__panel">
          <div className="batalla-naval__dato">
            <span>Disparos</span>
            <strong>{disparos}</strong>
          </div>

          <div className="batalla-naval__dato">
            <span>Aciertos</span>
            <strong>{aciertos}</strong>
          </div>

          <div className="batalla-naval__dato">
            <span>Eficiencia</span>
            <strong>{eficiencia}%</strong>
          </div>

          <div className="batalla-naval__dato">
            <span>Victorias</span>
            <strong>{estadisticas.victorias}</strong>
          </div>
        </div>

        <p
          className="batalla-naval__mensaje"
          aria-live="polite"
        >
          {mensaje}
        </p>

        <div className="batalla-naval__contenido">
          <div className="batalla-naval__tablero-contenedor">
            <div
              className="batalla-naval__tablero"
              role="grid"
              aria-label="Tablero de Batalla Naval"
            >
              <div
                className="batalla-naval__encabezado"
                aria-hidden="true"
              />

              {LETRAS_COLUMNAS.map((letra) => (
                <div
                  className="batalla-naval__encabezado"
                  key={letra}
                >
                  {letra}
                </div>
              ))}

              {tablero.map((fila, indiceFila) => (
                <div
                  className="batalla-naval__fila"
                  key={indiceFila}
                >
                  <div className="batalla-naval__numero">
                    {indiceFila + 1}
                  </div>

                  {fila.map((celda) => {
                    const letra =
                      LETRAS_COLUMNAS[
                        celda.coordenada.columna
                      ]

                    const coordenadaTexto =
                      `${letra}${celda.coordenada.fila + 1}`

                    return (
                      <button
                        className={obtenerClaseCelda(celda)}
                        type="button"
                        role="gridcell"
                        key={coordenadaTexto}
                        aria-label={`Disparar en ${coordenadaTexto}`}
                        disabled={
                          celda.estadoDisparo !==
                            'sin-disparo' ||
                          estadoPartida === 'ganada'
                        }
                        onClick={() =>
                          disparar(celda.coordenada)
                        }
                      >
                        {obtenerContenidoCelda(
                          celda.estadoDisparo,
                        )}
                      </button>
                    )
                  })}
                </div>
              ))}
            </div>
          </div>

          <aside className="batalla-naval__lateral">
            <h2>Flota enemiga</h2>

            <ul className="batalla-naval__flota">
              {barcos.map((barco) => (
                <li
                  className="batalla-naval__barco"
                  key={barco.id}
                >
                  <span className="batalla-naval__barco-nombre">
                    {barco.nombre} ({barco.longitud})
                  </span>

                  <span
                    className={
                      barco.hundido
                        ? 'batalla-naval__barco-estado batalla-naval__barco-estado--hundido'
                        : 'batalla-naval__barco-estado'
                    }
                  >
                    {barco.hundido
                      ? 'HUNDIDO'
                      : `${barco.impactos}/${barco.longitud} impactos`}
                  </span>
                </li>
              ))}
            </ul>

            <button
              className="batalla-naval__boton"
              type="button"
              onClick={nuevaPartida}
            >
              Nueva partida
            </button>

            {estadisticas.mejorCantidadDisparos !== null && (
              <p className="batalla-naval__mensaje">
                Récord: {estadisticas.mejorCantidadDisparos}{' '}
                disparos
              </p>
            )}
          </aside>
        </div>

        <div className="batalla-naval__leyenda">
          <span className="batalla-naval__leyenda-item">
            <span className="batalla-naval__leyenda-color batalla-naval__leyenda-color--agua" />
            Agua
          </span>

          <span className="batalla-naval__leyenda-item">
            <span className="batalla-naval__leyenda-color batalla-naval__leyenda-color--tocado" />
            Tocado
          </span>

          <span className="batalla-naval__leyenda-item">
            <span className="batalla-naval__leyenda-color batalla-naval__leyenda-color--hundido" />
            Hundido
          </span>
        </div>
      </section>
    </GameLayout>
  )
}

export default BatallaNaval
