import { useCallback, useEffect, useRef, useState } from "react";
import {
  ANCHO_CARRIL,
  crearObstaculo,
  hayColision,
  type Obstaculo,
} from "../logica/Obstaculos";
import { Cola } from "../../../estructuras/Cola";
import { useLocalStorage } from "../../../hooks/useLocalStorage";

type EstadoJuego = "inicio" | "jugando" | "perdido";

const PUMA_X = 60;
const PUMA_ANCHO = 46;
const PUMA_ALTO = 46;

//Lista fija de alturas
const SECUENCIA_SALTO = [
  10, 24, 38, 52, 64, 74, 80, 84, 84, 80, 74, 64, 52, 38, 24, 10, 0,
];

const INTERVALO_JUEGO_MS = 40;

const PASOS_ENTRE_OBSTACULOS_INICIAL = 45;
const VELOCIDAD_INICIAL = 6;
const VELOCIDAD_MAXIMA_NIVEL_2 = 14;
const PUNTAJE_PARA_ACELERAR = 15;

const PUNTAJE_NIVEL_3 = 200;
const VELOCIDAD_NIVEL_3 = 18;
const PASOS_ENTRE_OBSTACULOS_NIVEL_3 = 38; 

const PUNTAJE_NIVEL_4 = 400;
const VELOCIDAD_NIVEL_4 = 24;
const PASOS_ENTRE_OBSTACULOS_NIVEL_4 = 31;

const PUNTAJE_NIVEL_5 = 600;
const VELOCIDAD_NIVEL_5 = 32;
const PASOS_ENTRE_OBSTACULOS_NIVEL_5 = 23;

const PUNTAJE_NIVEL_6 = 800;
const VELOCIDAD_NIVEL_6 = 42;
const PASOS_ENTRE_OBSTACULOS_NIVEL_6 = 15;

const PUNTAJE_NIVEL_7 = 1000;
const VELOCIDAD_NIVEL_7 = 54;
const PASOS_ENTRE_OBSTACULOS_NIVEL_7 = 9; // aqui si se pone intenso

interface UsePumaRunReturn {
  estado: EstadoJuego;
  alturaSalto: number;
  obstaculos: Obstaculo[];
  puntaje: number;
  mejorPuntaje: number;
  saltar: () => void;
  iniciar: () => void;
  pumaX: number;
  pumaAncho: number;
  pumaAlto: number;
  anchoCarril: number;
}

export function usePumaRun(): UsePumaRunReturn {
  const [estado, setEstado] = useState<EstadoJuego>("inicio");
  const [alturaSalto, setAlturaSalto] = useState(0);
  const [obstaculos, setObstaculos] = useState<Obstaculo[]>([]);
  const [puntaje, setPuntaje] = useState(0);

  const { valor: mejorPuntaje, guardar: guardarMejorPuntaje } =
    useLocalStorage<number>("puma-run-mejor-puntaje", 0);

  const colaObstaculosRef = useRef(new Cola<Obstaculo>());
  const indiceSaltoRef = useRef<number>(-1);
  const velocidadRef = useRef(VELOCIDAD_INICIAL);
  const pasosEntreObstaculosRef = useRef(PASOS_ENTRE_OBSTACULOS_INICIAL);
  const puntajeRef = useRef(0);
  const ticksDesdeAparicionRef = useRef(0);
  const estadoRef = useRef<EstadoJuego>("inicio");

  useEffect(() => {
    estadoRef.current = estado;
  }, [estado]);

  const terminarJuego = useCallback(() => {
    setEstado("perdido");
    guardarMejorPuntaje((mejorActual) =>
      puntajeRef.current > mejorActual ? puntajeRef.current : mejorActual,
    );
  }, [guardarMejorPuntaje]);

  useEffect(() => {
    if (estado !== "jugando") return;

    const idIntervalo = setInterval(() => {
      let alturaActual = 0;
      if (indiceSaltoRef.current >= 0) {
        alturaActual = SECUENCIA_SALTO[indiceSaltoRef.current];
        indiceSaltoRef.current += 1;
        if (indiceSaltoRef.current >= SECUENCIA_SALTO.length) {
          indiceSaltoRef.current = -1;
          alturaActual = 0;
        }
      }

      ticksDesdeAparicionRef.current += 1;
      if (ticksDesdeAparicionRef.current >= pasosEntreObstaculosRef.current) {
        ticksDesdeAparicionRef.current = 0;
        colaObstaculosRef.current.encolar(crearObstaculo());
      }

      const cola = colaObstaculosRef.current;
      const totalEnCola = cola.tamaño();
      let colision = false;

      for (let i = 0; i < totalEnCola; i++) {
        const obstaculo = cola.desencolar()!;
        const movido: Obstaculo = {
          ...obstaculo,
          x: obstaculo.x - velocidadRef.current,
        };

        if (
          !colision &&
          hayColision(PUMA_X, alturaActual, PUMA_ANCHO, movido)
        ) {
          colision = true;
        }

        if (movido.x + movido.ancho > 0) {
          cola.encolar(movido);
        }
      }

      setAlturaSalto(alturaActual);
      setObstaculos(cola.aArray());

      if (colision) {
        terminarJuego();
        return;
      }

      puntajeRef.current += 1;
      setPuntaje(puntajeRef.current);

      if (puntajeRef.current === PUNTAJE_NIVEL_7) {
        velocidadRef.current = VELOCIDAD_NIVEL_7;
        pasosEntreObstaculosRef.current = PASOS_ENTRE_OBSTACULOS_NIVEL_7;
      } else if (puntajeRef.current === PUNTAJE_NIVEL_6) {
        velocidadRef.current = VELOCIDAD_NIVEL_6;
        pasosEntreObstaculosRef.current = PASOS_ENTRE_OBSTACULOS_NIVEL_6;
      } else if (puntajeRef.current === PUNTAJE_NIVEL_5) {
        velocidadRef.current = VELOCIDAD_NIVEL_5;
        pasosEntreObstaculosRef.current = PASOS_ENTRE_OBSTACULOS_NIVEL_5;
      } else if (puntajeRef.current === PUNTAJE_NIVEL_4) {
        velocidadRef.current = VELOCIDAD_NIVEL_4;
        pasosEntreObstaculosRef.current = PASOS_ENTRE_OBSTACULOS_NIVEL_4;
      } else if (puntajeRef.current === PUNTAJE_NIVEL_3) {
        velocidadRef.current = VELOCIDAD_NIVEL_3;
        pasosEntreObstaculosRef.current = PASOS_ENTRE_OBSTACULOS_NIVEL_3;
      } else if (
        puntajeRef.current < PUNTAJE_NIVEL_3 &&
        puntajeRef.current % PUNTAJE_PARA_ACELERAR === 0 &&
        velocidadRef.current < VELOCIDAD_MAXIMA_NIVEL_2
      ) {
        velocidadRef.current += 1;
      }
    }, INTERVALO_JUEGO_MS);

    return () => clearInterval(idIntervalo);
  }, [estado, terminarJuego]);

  const saltar = useCallback(() => {
    if (estadoRef.current !== "jugando") return;
    if (indiceSaltoRef.current !== -1) return;
    indiceSaltoRef.current = 0;
  }, []);

  const iniciar = useCallback(() => {
    colaObstaculosRef.current.limpiar();
    indiceSaltoRef.current = -1;
    velocidadRef.current = VELOCIDAD_INICIAL;
    pasosEntreObstaculosRef.current = PASOS_ENTRE_OBSTACULOS_INICIAL;
    puntajeRef.current = 0;
    ticksDesdeAparicionRef.current = 0;
    setAlturaSalto(0);
    setObstaculos([]);
    setPuntaje(0);
    setEstado("jugando");
  }, []);

  return {
    estado,
    alturaSalto,
    obstaculos,
    puntaje,
    mejorPuntaje,
    saltar,
    iniciar,
    pumaX: PUMA_X,
    pumaAncho: PUMA_ANCHO,
    pumaAlto: PUMA_ALTO,
    anchoCarril: ANCHO_CARRIL,
  };
}
