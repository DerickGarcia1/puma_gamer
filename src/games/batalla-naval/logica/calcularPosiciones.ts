import type { Coordenada, Orientacion } from './tipos'

export function calcularPosicionesBarco(
  coordenadaInicial: Coordenada,
  longitud: number,
  orientacion: Orientacion,
): Coordenada[] {
  return Array.from({ length: longitud }, (_, indice) => {
    if (orientacion === 'horizontal') {
      return {
        fila: coordenadaInicial.fila,
        columna: coordenadaInicial.columna + indice,
      }
    }

    return {
      fila: coordenadaInicial.fila + indice,
      columna: coordenadaInicial.columna,
    }
  })
}
