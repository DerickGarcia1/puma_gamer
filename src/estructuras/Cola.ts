export interface ICola<T>{
    encolar(item: T) : void
    desencolar(): T | undefined
    verFrente(): T | undefined
    estaVacia(): boolean
    tamaño(): number
    limpiar(): void
}

export class Cola<T> implements ICola<T>{
    private elementos: T [] = []

    encolar(item: T): void {
        this.elementos.push(item)
    }
    desencolar(): T | undefined {
        return this.elementos.shift()
    }
    verFrente(): T | undefined {
        return this.elementos[0]
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