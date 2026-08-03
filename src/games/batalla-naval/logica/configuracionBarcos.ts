import type { ConfiguracionBarco } from './tipos'

/**
 * Flota utilizada en cada partida de Batalla Naval.
 *
 * Cada objeto funciona como una plantilla.
 * La orientación y las posiciones se generan después.
 */
export const CONFIGURACION_BARCOS: ConfiguracionBarco[] = [
  {
    id: 'portaaviones',
    nombre: 'Portaaviones',
    longitud: 5,
  },
  {
    id: 'acorazado',
    nombre: 'Acorazado',
    longitud: 4,
  },
  {
    id: 'crucero',
    nombre: 'Crucero',
    longitud: 3,
  },
  {
    id: 'submarino',
    nombre: 'Submarino',
    longitud: 3,
  },
  {
    id: 'destructor',
    nombre: 'Destructor',
    longitud: 2,
  },
]