
/**
 * Logica del juego, define como se crea un obstaculo
*/

export interface Obstaculo{
    id: number;
    x: number;
    ancho: number;
    alto: number;
    tipo: 'roca' | 'arbusto';
}


export const ANCHO_CARRIL = 800;

let contadorId = 0;

export function crearObstaculo(): Obstaculo{
    contadorId += 1;

    const tipo: Obstaculo['tipo'] = Math.random() > 0.5 ? 'roca' : 'arbusto';
    const ancho = tipo === 'roca' ? 34 : 26;
    const alto = tipo === 'roca' ? 34 : 22;

    return{
        id: contadorId,
        x: ANCHO_CARRIL + ancho,
        ancho,
        alto,
        tipo,
    }
}

/** 
 * Colision por cajas
 * pumaY = altura de los pies del puma sobre el suelo (0 = en el piso)
*/

export function hayColision(
    pumaX: number,
    pumaY: number,
    pumaAncho: number,
    obstaculos: Obstaculo
): boolean {
    const pumaIzquierda = pumaX;
    const pumaDerecha = pumaX + pumaAncho;
    
    const obsIzquierda = obstaculos.x;
    const obsDerecha = obstaculos.x + obstaculos.ancho;

    const seSuperponenEnX = pumaDerecha > obsIzquierda && pumaIzquierda < obsDerecha;
    const seSuperponenEnY = pumaY < obstaculos.alto;

    return seSuperponenEnX && seSuperponenEnY;

}