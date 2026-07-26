function App() {
  return (
    <main className="app">
      <section className="welcome">
        <span className="welcome__badge">GRUPO</span>
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
            <h2>Puma Match</h2>
            <p>Encuentra todas las parejas antes de que termine el tiempo.</p>
          </article>

          <article className="game-preview">
            <h2>Puma Run</h2>
            <p>Salta La roca o el arbusto.</p>
          </article>

          <article className="game-preview">
            <h2>Puma fest</h2>
            <p>Salta La roca o el arbusto.</p>
          </article>

        </div>
      </section>
    </main>
  )
}

export default App