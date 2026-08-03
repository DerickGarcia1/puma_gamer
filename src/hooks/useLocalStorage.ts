import { useState } from 'react'

interface ResultadoLocalStorage<T> {
  valor: T
  guardar: (nuevoValor: T) => void
  reiniciar: () => void
}

export function useLocalStorage<T>(
  clave: string,
  valorInicial: T,
): ResultadoLocalStorage<T> {
  const [valor, setValor] = useState<T>(() => {
    try {
      const valorGuardado = localStorage.getItem(clave)

      if (valorGuardado === null) {
        return valorInicial
      }

      return JSON.parse(valorGuardado) as T
    } catch {
      return valorInicial
    }
  })

  function guardar(nuevoValor: T): void {
    setValor(nuevoValor)
    localStorage.setItem(
      clave,
      JSON.stringify(nuevoValor),
    )
  }

  function reiniciar(): void {
    setValor(valorInicial)
    localStorage.removeItem(clave)
  }

  return {
    valor,
    guardar,
    reiniciar,
  }
}
