/**
 * @fileoverview Hook personalizado para manejar la animación
 * del algoritmo de backtracking.
 */

import { useState, useRef, useCallback, useEffect } from 'react';
import { Tablero } from '../modelos/Tablero.js';
import { Caballo } from '../modelos/Caballo.js';
import { resolverRecorrido } from '../modelos/AlgoritmoBacktracking.js';
import { extraerTamanoTablero } from '../utilidades/auxiliares.js';
import { Temporizador } from '../utilidades/temporizador.js';
import { ControladorWebWorker } from './controladorWebWorker.js';
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
  const [usarWebWorker, setUsarWebWorker] = useState(true);

  const intervalIdRef = useRef(null);
  const caballoRef = useRef(null);
  const estadoAnimacionRef = useRef(crearEstadoInicialAnimacion());
  const velocidadRef = useRef(velocidad);
  const temporizadorRef = useRef(new Temporizador());
  const controladorWorkerRef = useRef(new ControladorWebWorker());
  const intervalTiempoRef = useRef(null);

  useEffect(() => {
    velocidadRef.current = velocidad;
  }, [velocidad]);

  /**
   * Inicia la actualización del tiempo en tiempo real durante la ejecución.
   */
  const iniciarActualizacionTiempo = useCallback(() => {
    if (intervalTiempoRef.current) {
      clearInterval(intervalTiempoRef.current);
    }
    
    intervalTiempoRef.current = setInterval(() => {
      if (temporizadorRef.current.estaEnEjecucion()) {
        const tiempoFormateado = temporizadorRef.current.obtenerTiempoFormateado();
        estadisticasHook.actualizarTiempo(tiempoFormateado);
      }
    }, 100);
  }, [estadisticasHook]);

  /**
   * Detiene la actualización del tiempo en tiempo real.
   */
  const detenerActualizacionTiempo = useCallback(() => {
    if (intervalTiempoRef.current) {
      clearInterval(intervalTiempoRef.current);
      intervalTiempoRef.current = null;
    }
  }, []);


  useEffect(() => {
    const controlador = controladorWorkerRef.current;

  
    controlador.onProgreso((datos) => {
      estadisticasHook.actualizarProgreso({
        movimientos: datos.movimientos,
        retrocesos: datos.retrocesos,
        progreso: undefined
      });
      if (datos.tiempoEjecucion) {
        estadisticasHook.actualizarTiempo(datos.tiempoEjecucion);
      }
    });

    controlador.onCompletado((datos) => {
      const { solucionEncontrada, tiempoEjecucion, movimientos, retrocesos, historial, solucion, historialMuestreado, historialOriginalLength, mensaje } = datos;
      
      detenerActualizacionTiempo();
      if (temporizadorRef.current.estaEnEjecucion()) {
        temporizadorRef.current.detener();
      }
      
      estadisticasHook.actualizarTodo({
        movimientos,
        retrocesos,
        progreso: 100,
        tiempoEjecucion 
      });

      if (!solucionEncontrada) {
        setSinSolucion(true);
        
        if (mensaje) {
          console.info(`[Worker] ${mensaje}`);
        }
        
        if (historial.length > 1) {
          if (historialMuestreado) {
            console.info(`Historial muestreado para la animación. Mostrando ${historial.length.toLocaleString()} de ${historialOriginalLength.toLocaleString()} movimientos totales.`);
          }
          
          const caballoSimulado = {
            historial,
            solucion: [],
            movimientos,
            retrocesos
          };
          caballoRef.current = caballoSimulado;
          setAnimacionActiva(true);
          setMostrarDetener(true);
          setTimeout(() => {
            if (caballoRef.current) {
              animarHistorial(caballoRef.current);
            }
          }, 0);
        }
        return;
      }

      if (historialMuestreado) {
        console.info(`Solución encontrada. Animación limitada a ${historial.length.toLocaleString()} de ${historialOriginalLength.toLocaleString()} movimientos totales.`);
      }
      
      const caballoConSolucion = {
        historial,
        solucion,
        movimientos,
        retrocesos
      };
      
      caballoRef.current = caballoConSolucion;
      const n = Math.sqrt(solucion.length);
      const mapaSolucion = generarMapaSolucion(solucion);
      tableroHook.establecerSolucion(n, mapaSolucion);

      setAnimacionActiva(true);
      setMostrarDetener(true);
      setTimeout(() => {
        if (caballoRef.current) {
          animarHistorial(caballoRef.current);
        }
      }, 0);
    });

    controlador.onError((error) => {
      console.error('Error en Web Worker:', error);
      detenerActualizacionTiempo();
      if (temporizadorRef.current.estaEnEjecucion()) {
        temporizadorRef.current.detener();
      }
      setUsarWebWorker(false);
      if (intervalIdRef.current) {
        clearTimeout(intervalIdRef.current);
        intervalIdRef.current = null;
      }
      
      setAnimacionActiva(false);
      setMostrarDetener(false);
      setSinSolucion(false);
      tableroHook.limpiarTablero();
      estadisticasHook.reiniciar();
      estadoAnimacionRef.current = crearEstadoInicialAnimacion();
      caballoRef.current = null;
    });

    return () => {
      controlador.terminar();
      if (intervalTiempoRef.current) {
        clearInterval(intervalTiempoRef.current);
        intervalTiempoRef.current = null;
      }
    };
  }, []);



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
        setAnimacionActiva(false); 
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
    
    detenerActualizacionTiempo();
    
    if (temporizadorRef.current.estaEnEjecucion()) {
      temporizadorRef.current.detener();
    }
    
    if (controladorWorkerRef.current.estaEnEjecucion()) {
      controladorWorkerRef.current.detener();
    }
    
    setAnimacionActiva(false);
    setMostrarDetener(false);
    setSinSolucion(false);
    tableroHook.limpiarTablero();
    tableroHook.limpiarSolucion();
    
    if (tableroHook.posicionSeleccionada) {
      tableroHook.actualizarPosicionCaballo(tableroHook.posicionSeleccionada);
    } else {
      tableroHook.actualizarPosicionCaballo(null);
    }
    
    estadisticasHook.reiniciar();
    estadoAnimacionRef.current = crearEstadoInicialAnimacion();
    caballoRef.current = null;
  }, [tableroHook, estadisticasHook, detenerActualizacionTiempo]);

  /**
   * Ejecuta el algoritmo usando Web Worker (asíncrono).
   */
  const iniciarConWebWorker = useCallback(async (tamano, recorridoCerrado, filaInicial, columnaInicial) => {
    const n = extraerTamanoTablero(tamano);
    
    tableroHook.limpiarTablero();
    tableroHook.limpiarSolucion();
    estadisticasHook.reiniciar();
    estadoAnimacionRef.current = crearEstadoInicialAnimacion();
    setSinSolucion(false);
    setMostrarDetener(true);

    
    const exito = controladorWorkerRef.current.ejecutarAlgoritmo({
      tamano: n,
      recorridoCerrado,
      filaInicial,
      columnaInicial
    });

    if (!exito) {
      console.warn('Fallback al algoritmo síncrono - ejecutando directamente');
      
      temporizadorRef.current.iniciar();
      iniciarActualizacionTiempo();
      
      try {
        const tablero = new Tablero(n);
        const casillaInicial = tablero.obtenerCasilla(filaInicial, columnaInicial);
        const caballo = new Caballo(casillaInicial, n * n);

        const solucionEncontrada = resolverRecorrido(caballo, recorridoCerrado);
        
        detenerActualizacionTiempo();
        temporizadorRef.current.detener();
        const tiempoFormateado = temporizadorRef.current.obtenerTiempoFormateado();
        estadisticasHook.actualizarTiempo(tiempoFormateado);

        if (!solucionEncontrada) {
          setSinSolucion(true);
          if (caballo.historial.length > 1) {
            caballoRef.current = caballo;
            setAnimacionActiva(true);
            setMostrarDetener(true);
            animarHistorial(caballo);
          } 
          return;
        }

        caballoRef.current = caballo;
        const mapaSolucion = generarMapaSolucion(caballo.solucion);
        tableroHook.establecerSolucion(n, mapaSolucion);

        setAnimacionActiva(true);
        setMostrarDetener(true);
        animarHistorial(caballo);
      } catch (error) {
        detenerActualizacionTiempo();
        temporizadorRef.current.detener();
        detener();
      }
    }
  }, [tableroHook, estadisticasHook, iniciarActualizacionTiempo, detenerActualizacionTiempo, animarHistorial, detener]);

  const iniciar = useCallback(async (tamano, recorridoCerrado, filaInicial, columnaInicial) => {
    if (animacionActiva) return;

    if (usarWebWorker && ControladorWebWorker.esSoportado()) {
      return iniciarConWebWorker(tamano, recorridoCerrado, filaInicial, columnaInicial);
    } else {
      try {
        const n = extraerTamanoTablero(tamano);
        const tablero = new Tablero(n);
        const casillaInicial = tablero.obtenerCasilla(filaInicial, columnaInicial);
        const caballo = new Caballo(casillaInicial, n * n);

        tableroHook.limpiarTablero();
        tableroHook.limpiarSolucion();
        estadisticasHook.reiniciar();
        estadoAnimacionRef.current = crearEstadoInicialAnimacion();
        setSinSolucion(false);

        temporizadorRef.current.iniciar();
        iniciarActualizacionTiempo();
        
        const solucionEncontrada = resolverRecorrido(caballo, recorridoCerrado);
        
        detenerActualizacionTiempo();
        temporizadorRef.current.detener();
        const tiempoFormateado = temporizadorRef.current.obtenerTiempoFormateado();
        
        estadisticasHook.actualizarTiempo(tiempoFormateado);

        if (!solucionEncontrada) {
          setSinSolucion(true);
          if (caballo.historial.length > 1) {
            caballoRef.current = caballo;
            setAnimacionActiva(true);
            setMostrarDetener(true);
            animarHistorial(caballo);
          } 
          return;
        }

        caballoRef.current = caballo;
        const mapaSolucion = generarMapaSolucion(caballo.solucion);
        tableroHook.establecerSolucion(n, mapaSolucion);

        setAnimacionActiva(true);
        setMostrarDetener(true);
        animarHistorial(caballo);
      } catch (error) {
        detenerActualizacionTiempo();
        temporizadorRef.current.detener();
        detener();
      }
    }
  }, [animacionActiva, usarWebWorker, iniciarConWebWorker, tableroHook, estadisticasHook, iniciarActualizacionTiempo, detenerActualizacionTiempo, animarHistorial, detener]);

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
    mostrarDetener,
    velocidad,
    sinSolucion,
    usarWebWorker,
    iniciar,
    detener,
    pausar,
    reanudar,
    reiniciar,
    cambiarVelocidad,
  };
}
