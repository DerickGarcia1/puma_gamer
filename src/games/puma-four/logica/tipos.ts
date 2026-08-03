import type { Pila } from '../../../estructuras/Pila'

// Representa el contenido de una celda del tablero:
// - 'jugador1' o 'jugador2' si ya cayó una ficha ahí
// - null si la celda todavía está vacía
export type Ficha = 'jugador1' | 'jugador2' | null

// El tablero completo: una matriz de 6 filas x 7 columnas de Fichas
export type Tablero = Ficha[][]

// Los posibles estados generales de la partida
export type EstadoJuego = 'jugando' | 'ganoJugador1' | 'ganoJugador2' | 'empate'

// Todo el estado que necesita el juego para funcionar en un momento dado
export interface EstadoPumaFour {
  tablero: Tablero
  pilasColumnas: Pila<Ficha>[]
  turnoActual: 'jugador1' | 'jugador2'
  estado: EstadoJuego
}