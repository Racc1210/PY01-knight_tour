/* eslint-disable no-restricted-globals */

/**
 * @fileoverview Web Worker para ejecutar el algoritmo de backtracking
 * del caballo, enviando actualizaciones de progreso y resultados.
 */

import { Tablero } from '../modelos/Tablero.js';
import { Caballo } from '../modelos/Caballo.js';
import { resolverRecorrido } from '../modelos/AlgoritmoBacktracking.js';

function enviarMensaje(tipo, datos) {
  self.postMessage({ tipo, datos });
}

function formatearTiempo(ms) {
  return ms < 1000 ? `${Math.round(ms)}ms` : `${(ms / 1000).toFixed(2)}s`;
}

/** Limita el historial para no saturar la memoria. */
function limitarHistorial(historial, limite) {
  if (historial.length > limite) {
    return {
      historial: historial.slice(0, limite),
      historialMuestreado: true,
      historialOriginalLength: historial.length,
    };
  }
  return {
    historial,
    historialMuestreado: false,
  };
}

/**
 * Ejecuta el algoritmo de backtracking, enviando progreso periódico.
 *
 * @param {!Caballo} caballo Instancia del caballo.
 * @param {boolean} recorridoCerrado True si se busca recorrido cerrado.
 * @param {number} tiempoInicio Marca de tiempo inicial.
 * @return {boolean} True si se encontró solución.
 */
function ejecutarConProgreso(caballo, recorridoCerrado, tiempoInicio) {
  let contadorIteraciones = 0;

  enviarMensaje('progreso', { tiempoEjecucion: '0ms' });

  const originalAvanzarA = caballo.avanzarA.bind(caballo);
  caballo.avanzarA = (casilla) => {
    contadorIteraciones++;

    if (contadorIteraciones % 500 === 0) {
      const tiempoTranscurrido = performance.now() - tiempoInicio;
      enviarMensaje('progreso', {
        tiempoEjecucion: formatearTiempo(tiempoTranscurrido),
        iteraciones: contadorIteraciones,
        movimientos: caballo.movimientos,
        retrocesos: caballo.retrocesos,
      });
    }
    return originalAvanzarA(casilla);
  };

  const resultado = resolverRecorrido(caballo, recorridoCerrado);
  caballo.avanzarA = originalAvanzarA; 
  return resultado;
}

self.onmessage = (event) => {
  const { tipo, datos } = event.data;
  if (tipo !== 'iniciar') return;

  const { tamano, recorridoCerrado, filaInicial, columnaInicial } = datos;

  try {
    const tablero = new Tablero(tamano);
    const casillaInicial = tablero.obtenerCasilla(filaInicial, columnaInicial);
    const caballo = new Caballo(casillaInicial, tamano * tamano);

    const tiempoInicio = performance.now();
    const solucionEncontrada = ejecutarConProgreso(caballo, recorridoCerrado, tiempoInicio);
    const duracion = performance.now() - tiempoInicio;

    const datosResultado = {
      solucionEncontrada,
      tiempoEjecucion: formatearTiempo(duracion),
      movimientos: caballo.movimientos,
      retrocesos: caballo.retrocesos,
    };

    if (solucionEncontrada) {
      Object.assign(datosResultado, limitarHistorial(caballo.historial, 30000));
      datosResultado.solucion = caballo.solucion;
    } else {
      Object.assign(datosResultado, limitarHistorial(caballo.historial, 3000));
      datosResultado.solucion = [];
      if (datosResultado.historialMuestreado) {
        datosResultado.mensaje =
          `No se encontró solución. Mostrando primeros 3,000 de ${caballo.historial.length.toLocaleString()} movimientos explorados.`;
      } else {
        datosResultado.mensaje = 'No se encontró solución.';
      }
    }

    enviarMensaje('completado', datosResultado);
  } catch (error) {
    enviarMensaje('error', { mensaje: error.message, stack: error.stack });
  }
};
