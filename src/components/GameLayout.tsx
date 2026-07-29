import { Link } from 'react-router-dom'

interface GameLayoutProps {
  title: string
  children: React.ReactNode
}

function GameLayout({ title, children }: GameLayoutProps) {
  return (
    <main className="game-page">
      <header className="game-page__header">
        <Link to="/" className="game-page__back">
          ← Volver
        </Link>
        <h1>{title}</h1>
      </header>

      <section className="game-page__content">{children}</section>
    </main>
  )
}

export default GameLayout