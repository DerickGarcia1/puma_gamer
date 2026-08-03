export interface IPila<T>{
    apilar(item: T) : void
    desapilar(): T | undefined
    verTope(): T | undefined
    estaVacia(): boolean
    tamaño(): number
    limpiar(): void
}

export class Pila<T> implements IPila<T>{
    private elementos: T [] = []

    apilar(item: T): void {
        this.elementos.push(item)
    }
    desapilar(): T | undefined {
        return this.elementos.pop()
    }
    verTope(): T | undefined {
        return this.elementos[this.elementos.length - 1]
    }
    estaVacia(): boolean {
        return this.elementos.length === 0
    }
    tamaño(): number {
        return this.elementos.length
    }
    limpiar(): void {
        this.elementos = []
    }

    aArray(): T[] {
        return [...this.elementos]
    }

}