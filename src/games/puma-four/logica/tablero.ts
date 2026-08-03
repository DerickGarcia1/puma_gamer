import type { Ficha, Tablero } from './tipos'
import { Pila } from '../../../estructuras/Pila'

const FILAS = 6
const COLUMNAS = 7

export function crearTableroVacio(): Tablero {
  const tablero: Tablero = []

  for (let fila = 0; fila < FILAS; fila++) {
    const nuevaFila: Ficha[] = []
    for (let columna = 0; columna < COLUMNAS; columna++) {
      nuevaFila.push(null)
    }
    tablero.push(nuevaFila)
  }

  return tablero
}

export function crearPilasColumnas(): Pila<Ficha>[] {
  const pilas: Pila<Ficha>[] = []

  for (let columna = 0; columna < COLUMNAS; columna++) {
    pilas.push(new Pila<Ficha>())
  }

  return pilas
}

export interface ResultadoJugada {
  exito: boolean
  fila: number
  columna: number
}

export function soltarFicha(
  tablero: Tablero,
  pilasColumnas: Pila<Ficha>[],
  columna: number,
  jugador: 'jugador1' | 'jugador2'
): ResultadoJugada {
  const pilaDeLaColumna = pilasColumnas[columna]

  if (pilaDeLaColumna.tamaño() >= FILAS) {
    return { exito: false, fila: -1, columna }
  }

  const fila = FILAS - 1 - pilaDeLaColumna.tamaño()

  pilaDeLaColumna.apilar(jugador)
  tablero[fila][columna] = jugador

  return { exito: true, fila, columna }
}

// Cuenta cuántas fichas iguales al jugador hay en una dirección específica,
// empezando justo al lado de la posición dada (sin contar la posición inicial)
function contarEnDireccion(
  tablero: Tablero,
  fila: number,
  columna: number,
  deltaFila: number,
  deltaColumna: number,
  jugador: 'jugador1' | 'jugador2'
): number {
  let contador = 0
  let filaActual = fila + deltaFila
  let columnaActual = columna + deltaColumna

  while (
    filaActual >= 0 &&
    filaActual < FILAS &&
    columnaActual >= 0 &&
    columnaActual < COLUMNAS &&
    tablero[filaActual][columnaActual] === jugador
  ) {
    contador++
    filaActual += deltaFila
    columnaActual += deltaColumna
  }

  return contador
}

// Revisa si, a partir de la última ficha colocada, se formó una línea de 4
export function hayVictoria(
  tablero: Tablero,
  fila: number,
  columna: number,
  jugador: 'jugador1' | 'jugador2'
): boolean {
  const direcciones = [
    { deltaFila: 0, deltaColumna: 1 },  // horizontal
    { deltaFila: 1, deltaColumna: 0 },  // vertical
    { deltaFila: 1, deltaColumna: 1 },  // diagonal ↘
    { deltaFila: 1, deltaColumna: -1 }, // diagonal ↙
  ]

  for (const { deltaFila, deltaColumna } of direcciones) {
    const haciaUnLado = contarEnDireccion(tablero, fila, columna, deltaFila, deltaColumna, jugador)
    const haciaElOtroLado = contarEnDireccion(tablero, fila, columna, -deltaFila, -deltaColumna, jugador)

    const totalEnLinea = haciaUnLado + haciaElOtroLado + 1 // +1 por la ficha misma

    if (totalEnLinea >= 4) {
      return true
    }
  }

  return false
}

// Revisa si el tablero está completamente lleno (para detectar empate)
export function tableroLleno(pilasColumnas: Pila<Ficha>[]): boolean {
  return pilasColumnas.every((pila) => pila.tamaño() >= FILAS)
}