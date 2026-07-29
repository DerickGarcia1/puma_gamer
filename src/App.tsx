function App() {
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
            <p>El Puma esquiva rocas y arbustos saltando en el momento justo.
              la velocidad aumenta con el tiempo.
            </p>
            <button className="game-preview__play">Jugar</button>
          </article>

          <article className="game-preview">
            <h2>Puma four</h2>
            <p>
              El clásico 4 en línea. Conecta tus fichas y gana usando pilas para
              controlar cada jugada.
            </p>
            <button className="game-preview__play">Jugar</button>
          </article>

          <article className="game-preview">
            <h2>Puma Naval</h2>
            <p>
              Hunde la flota enemiga. Batalla naval clásica basada en matrices para
              ubicar y atacar barcos.
            </p>
            <button className="game-preview__play">Jugar</button>
          </article>

        </div>
      </section>
    </main>
  )
}

export default App