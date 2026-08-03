export type Orientacion = 'horizontal' | 'vertical'

export type EstadoDisparo =
  | 'sin-disparo'
  | 'agua'
  | 'tocado'
  | 'hundido'

export interface Coordenada {
  fila: number
  columna: number
}

export interface Celda {
  coordenada: Coordenada
  barcoId: string | null
  estadoDisparo: EstadoDisparo
}

export type Tablero = Celda[][]

export interface ConfiguracionBarco {
  id: string
  nombre: string
  longitud: number
}

export interface Barco {
  id: string
  nombre: string
  longitud: number
  orientacion: Orientacion
  posiciones: Coordenada[]
  impactos: number
  hundido: boolean
}

export type EstadoPartida = 'jugando' | 'ganada'

export type TipoResultadoDisparo =
  | 'repetido'
  | 'agua'
  | 'tocado'
  | 'hundido'

export interface ResultadoDisparo {
  tablero: Tablero
  barcos: Barco[]
  tipo: TipoResultadoDisparo
  mensaje: string
  fueAcierto: boolean
  victoria: boolean
}

export interface ResultadoColocacionBarco {
  tablero: Tablero
  barco: Barco
}

export interface EstadoBatallaNaval {
  tablero: Tablero
  barcos: Barco[]
  disparos: number
  aciertos: number
  estadoPartida: EstadoPartida
  mensaje: string
}

export interface EstadisticasBatallaNaval {
  victorias: number
  mejorCantidadDisparos: number | null
}
