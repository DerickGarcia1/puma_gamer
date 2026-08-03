/**
 * Indica las dos orientaciones posibles de un barco.
 *
 * Horizontal: el barco ocupa varias columnas.
 * Vertical: el barco ocupa varias filas.
 */
export type Orientacion = 'horizontal' | 'vertical'

/**
 * Representa el estado visible de una casilla.
 *
 * sin-disparo: todavía no ha sido seleccionada.
 * agua: el disparo no encontró ningún barco.
 * tocado: el disparo impactó un barco que sigue a flote.
 * hundido: el barco completo fue destruido.
 */
export type EstadoDisparo =
  | 'sin-disparo'
  | 'agua'
  | 'tocado'
  | 'hundido'

/**
 * Representa una posición exacta dentro de la matriz.
 *
 * Los índices comienzan en cero.
 * Por ejemplo, fila 0 y columna 0 representan la primera casilla.
 */
export interface Coordenada {
  fila: number
  columna: number
}

/**
 * Representa una casilla individual del tablero.
 */
export interface Celda {
  coordenada: Coordenada

  /**
   * Guarda el identificador del barco que ocupa la celda.
   * Su valor es null cuando la casilla está vacía.
   */
  barcoId: string | null

  /**
   * Indica qué ocurrió en esta celda después de un disparo.
   */
  estadoDisparo: EstadoDisparo
}

/**
 * El tablero es una matriz de celdas.
 *
 * El primer índice representa la fila.
 * El segundo índice representa la columna.
 *
 * Ejemplo:
 * tablero[2][4]
 */
export type Tablero = Celda[][]

/**
 * Representa un barco completo dentro del juego.
 */
export interface Barco {
  /**
   * Identificador único utilizado para relacionar
   * el barco con las celdas de la matriz.
   */
  id: string

  /**
   * Nombre que se mostrará al jugador.
   */
  nombre: string

  /**
   * Cantidad de celdas que ocupa el barco.
   */
  longitud: number

  /**
   * Dirección en la que fue colocado.
   */
  orientacion: Orientacion

  /**
   * Todas las posiciones ocupadas por el barco.
   */
  posiciones: Coordenada[]

  /**
   * Cantidad de disparos que han impactado el barco.
   */
  impactos: number

  /**
   * Será true cuando impactos sea igual a longitud.
   */
  hundido: boolean
}

/**
 * Representa el estado general de la partida.
 */
export type EstadoPartida = 'jugando' | 'ganada'

/**
 * Resultados posibles al procesar un disparo.
 *
 * repetido significa que esa coordenada ya había sido seleccionada.
 */
export type TipoResultadoDisparo =
  | 'repetido'
  | 'agua'
  | 'tocado'
  | 'hundido'

/**
 * Información que devolverá la función encargada
 * de procesar un disparo.
 */
export interface ResultadoDisparo {
  tablero: Tablero
  barcos: Barco[]
  tipo: TipoResultadoDisparo
  mensaje: string
}