/**
 * @fileoverview Hook personalizado para manejar la animación
 * del algoritmo de backtracking.
 */

import { useState, useRef, useCallback, useEffect } from 'react';
import { Tablero } from '../modelos/Tablero.js';
import { Caballo } from '../modelos/Caballo.js';
import { resolverRecorrido } from '../modelos/AlgoritmoBacktracking.js';
import { extraerTamanoTablero } from '../utilidades/auxiliares.js';
import {
  generarSiguienteFrame,
  crearEstadoInicialAnimacion,
  generarMapaSolucion,
  calcularProgreso,
} from './animacionBacktracking.js';

/**
 * Hook para gestionar la animación del algoritmo de backtracking.
 *
 * @param {!Object} tableroHook Hook de estado del tablero.
 * @param {!Object} estadisticasHook Hook de estadísticas.
 * @param {number=} velocidadInicial Velocidad inicial en movimientos por segundo.
 * @return {!Object} Estado y funciones para controlar la animación.
 */
export function useAnimacionBacktracking(tableroHook, estadisticasHook, velocidadInicial = 1) {
  const [animacionActiva, setAnimacionActiva] = useState(false);
  const [mostrarDetener, setMostrarDetener] = useState(false);
  const [velocidad, setVelocidad] = useState(velocidadInicial);
  const [sinSolucion, setSinSolucion] = useState(false);

  const intervalIdRef = useRef(null);
  const caballoRef = useRef(null);
  const estadoAnimacionRef = useRef(crearEstadoInicialAnimacion());
  const velocidadRef = useRef(velocidad);

  useEffect(() => {
    velocidadRef.current = velocidad;
  }, [velocidad]);

  /**
   * Inicia el algoritmo y la animación.
   */

  /**
   * Anima el historial paso a paso.
   */
  const animarHistorial = useCallback((caballo) => {
    const siguientePaso = () => {
      const estadoActual = estadoAnimacionRef.current;
      const { historial, solucion } = caballo;

      const nuevoEstado = generarSiguienteFrame(estadoActual, historial, solucion);
      estadoAnimacionRef.current = nuevoEstado;

      if (nuevoEstado.completado) {
        setAnimacionActiva(false); // La animación se detiene
        // Pero mantenermos mostrarDetener en true para permitir limpiar el tablero
        return;
      }

      tableroHook.actualizarCasillasVisitadas(nuevoEstado.casillasVerdes);
      tableroHook.actualizarCasillasBacktracking(nuevoEstado.casillasRojas);
      tableroHook.actualizarNumerosBacktracking(nuevoEstado.numerosRojos);
      tableroHook.actualizarPosicionCaballo(nuevoEstado.posicionCaballo);

      const progreso = calcularProgreso(nuevoEstado.movimientosProgreso, historial.length);
      estadisticasHook.actualizarTodo({
        movimientos: caballo.movimientos,
        retrocesos: caballo.retrocesos,
        progreso,
      });

      const tiempoEspera = 1000 / velocidadRef.current;
      intervalIdRef.current = setTimeout(siguientePaso, tiempoEspera);
    };

    siguientePaso();
  }, [tableroHook, estadisticasHook]);

  /**
   * Detiene la animación y reinicia el estado.
   */
  const detener = useCallback(() => {
    if (intervalIdRef.current) {
      clearTimeout(intervalIdRef.current);
      intervalIdRef.current = null;
    }
    setAnimacionActiva(false);
    setMostrarDetener(false); // Ahora sí ocultamos el botón detener
    setSinSolucion(false);
    tableroHook.limpiarTablero();
    estadisticasHook.reiniciar();
    estadoAnimacionRef.current = crearEstadoInicialAnimacion();
    caballoRef.current = null;
  }, [tableroHook, estadisticasHook]);

  const iniciar = useCallback(async (tamano, recorridoCerrado, filaInicial, columnaInicial) => {
    if (animacionActiva) return;

    try {
      const n = extraerTamanoTablero(tamano);
      const tablero = new Tablero(n);
      const casillaInicial = tablero.obtenerCasilla(filaInicial, columnaInicial);
      const caballo = new Caballo(casillaInicial, n * n);

      tableroHook.limpiarTablero();
      estadisticasHook.reiniciar();
      estadoAnimacionRef.current = crearEstadoInicialAnimacion();
      setSinSolucion(false);

      const solucionEncontrada = resolverRecorrido(caballo, recorridoCerrado);

      if (!solucionEncontrada) {
        setSinSolucion(true);

        if (caballo.historial.length > 1) {
          caballoRef.current = caballo;
          setAnimacionActiva(true);
          setMostrarDetener(true); // Activamos el botón detener también para casos sin solución
          animarHistorial(caballo);
        } 

        return;
      }

      caballoRef.current = caballo;
      const mapaSolucion = generarMapaSolucion(caballo.solucion);
      tableroHook.establecerSolucion(n, mapaSolucion);

      setAnimacionActiva(true);
      setMostrarDetener(true); // Activamos el botón detener
      animarHistorial(caballo);
    } catch (error) {
      detener();
    }
    }, [animacionActiva, tableroHook, estadisticasHook, animarHistorial, detener]);

  /** Pausa la animación. */
  const pausar = useCallback(() => {
    if (intervalIdRef.current) {
      clearTimeout(intervalIdRef.current);
      intervalIdRef.current = null;
    }
  }, []);

  /** Reanuda la animación. */
  const reanudar = useCallback(() => {
    if (animacionActiva && caballoRef.current && !intervalIdRef.current) {
      animarHistorial(caballoRef.current);
    }
  }, [animacionActiva, animarHistorial]);

  /** Reinicia la animación desde el principio. */
  const reiniciar = useCallback(() => {
    if (caballoRef.current) {
      estadoAnimacionRef.current = crearEstadoInicialAnimacion();
      tableroHook.limpiarTablero();
      estadisticasHook.reiniciar();

      if (intervalIdRef.current) {
        clearTimeout(intervalIdRef.current);
      }
      animarHistorial(caballoRef.current);
    }
  }, [tableroHook, estadisticasHook, animarHistorial]);

  /** Cambia la velocidad de la animación. */
  const cambiarVelocidad = useCallback((nuevaVelocidad) => {
    setVelocidad(nuevaVelocidad);
  }, []);

  return {
    animacionActiva,
    mostrarDetener, // Nuevo estado para controlar la visibilidad del botón
    velocidad,
    sinSolucion,
    iniciar,
    detener,
    pausar,
    reanudar,
    reiniciar,
    cambiarVelocidad,
  };
}
