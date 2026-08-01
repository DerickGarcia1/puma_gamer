import { useEffect } from 'react'
import GameLayout from '../components/GameLayout'
import { usePumaRun } from '../games/puma-run/hooks/usePumaRun'
import '../games/puma-run/PumaRun.css'

function PumaRun() {
    const {
        estado,
        alturaSalto,
        obstaculos,
        puntaje,
        mejorPuntaje,
        saltar,
        iniciar,
        pumaX,
        pumaAncho,
        pumaAlto,
        anchoCarril,
    } = usePumaRun()

    // Salto con teclado: barra espaciadora o flecha arriba
    useEffect(() => {
        const alPresionarTecla = (evento: KeyboardEvent) => {
            if (evento.code === 'Space' || evento.code === 'ArrowUp') {
                evento.preventDefault()
                if (estado === 'jugando') {
                    saltar()
                } else {
                    iniciar()
                }
            }
        }

        window.addEventListener('keydown', alPresionarTecla)
        return () => window.removeEventListener('keydown', alPresionarTecla)
    }, [estado, saltar, iniciar])

    const alTocarCarril = () => {
        if (estado === 'jugando') {
            saltar()
        } else {
            iniciar()
        }
    }

    return (
        <GameLayout title="Puma Run">
            <div className="puma-run-page">
                <ul className="puma-run-instrucciones">
                    <li>Espacio o ↑ para saltar</li>
                    <li>Toca la pantalla en movil</li>
                    <li>Esquiva rocas y arbustos</li>
                </ul>

                <div className="puma-run-marcador">
                    <span>
                        Puntaje: <strong>{puntaje}</strong>
                    </span>
                    <span>
                        Mejor puntaje: <strong>{mejorPuntaje}</strong>
                    </span>
                </div>

                <div
                    className="puma-run-carril"
                    style={{ maxWidth: anchoCarril }}
                    onClick={alTocarCarril}
                    role="button"
                    tabIndex={0}
                    aria-label="Area de juego, toca para saltar"
                >
                    <div className="puma-run-suelo" />

                    <div
                        className="puma-run-sprite"
                        style={{
                            left: pumaX,
                            bottom: alturaSalto,
                            width: pumaAncho,
                            height: pumaAlto,
                        }}
                    />

                    {obstaculos.map((obstaculo) => (
                        <div
                            key={obstaculo.id}
                            className={`puma-run-obstaculo puma-run-obstaculo--${obstaculo.tipo}`}
                            style={{
                                left: obstaculo.x,
                                width: obstaculo.ancho,
                                height: obstaculo.alto,
                            }}
                        />
                    ))}

                    {estado !== 'jugando' && (
                        <div className="puma-run-overlay">
                            {estado === 'inicio' && (
                                <>
                                    <p>Toca o presiona Espacio para empezar</p>
                                    <button onClick={iniciar}>Jugar</button>
                                </>
                            )}
                            {estado === 'perdido' && (
                                <>
                                    <p>¡Chocaste! Puntaje final: {puntaje}</p>
                                    <button onClick={iniciar}>Volver a intentar</button>
                                </>
                            )}
                        </div>
                    )}
                </div>
            </div>
        </GameLayout>
    )
}

export default PumaRun