import { Link } from 'react-router-dom'

function Home() {
  return (
    <main className="app">
      <section className="welcome">
        <img
          className="welcome__logo"
          src="/icons/pumagamer-logo.png"
          alt="Logo de PumaGamer"
        />
        <h1>PumaGamer</h1>

        <p>
          Plataforma de juegos desarrollada con React, TypeScript y
          estructuras de datos.
        </p>

        <div className="welcome__games">
          <article className="game-preview">
            <h2>Puma Run</h2>
            <p>
              Esquiva obstáculos sin parar. Un runner infinito que usa colas
              para generar los cactus en tiempo real.
            </p>
            <Link to="/puma-run" className="game-preview__play">
              Jugar
            </Link>
          </article>

          <article className="game-preview">
            <h2>Puma four</h2>
            <p>
              El clásico 4 en línea. Conecta tus fichas y gana usando pilas
              para controlar cada jugada.
            </p>
            <Link to="/puma-four" className="game-preview__play">
              Jugar
            </Link>
          </article>

          <article className="game-preview">
            <h2>Puma Naval</h2>
            <p>
              Hunde la flota enemiga. Batalla naval clásica basada en
              matrices para ubicar y atacar barcos.
            </p>
            <Link to="/batalla-naval" className="game-preview__play">
              Jugar
            </Link>
          </article>
        </div>
      </section>
    </main>
  )
}

export default Home