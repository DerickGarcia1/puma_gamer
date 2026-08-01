import { useCallback, useState } from "react";

interface UseLocalStorageReturn<T> {
    valor: T;
    guardar: (nuevoValor: T | ((anterior: T) => T)) => void;
    reiniciar: () => void;
}

export function useLocalStorage<T>(
    clave: string,
    valorInicial: T
): UseLocalStorageReturn<T> {
    const [valor, setValor] = useState<T>(() => {
        try {
            const guardado = window.localStorage.getItem(clave);
            return guardado !== null ? (JSON.parse(guardado) as T) : valorInicial;
        } catch {
            return valorInicial;
        }
    });

    const guardar = useCallback(
        (nuevoValor: T | ((anterior: T) => T)) => {
            setValor((anterior) => {
                const resultado =
                    typeof nuevoValor === "function"
                        ? (nuevoValor as (anterior: T) => T)(anterior)
                        : nuevoValor;

                try {
                    window.localStorage.setItem(clave, JSON.stringify(resultado));
                } catch {
                    // localStorage puede fallar (modo privado, cuota llena, etc.)
                    // El juego debe seguir funcionando aunque no se pueda persistir.
                }
                return resultado;
            });
        },
        [clave]
    );

    const reiniciar = useCallback(() => {
        guardar(valorInicial);
    }, [guardar, valorInicial]);

    return { valor, guardar, reiniciar };
}
