/**
 * @fileoverview Hook personalizado para manejar las estadísticas del algoritmo.
 * Gestiona movimientos, retrocesos, progreso y tiempo de ejecución.
 */

import { useState } from 'react';

/**
 * Hook para gestionar las estadísticas de la animación.
 *
 * @return {!Object} Estado y funciones para manipular estadísticas.
 */
export function useEstadisticas() {
  const [movimientos, setMovimientos] = useState(0);
  const [retrocesos, setRetrocesos] = useState(0);
  const [progreso, setProgreso] = useState(0);
  const [tiempoEjecucion, setTiempoEjecucion] = useState('0.0s');

  /** Reinicia todas las estadísticas a 0. */
  const reiniciar = () => {
    setMovimientos(0);
    setRetrocesos(0);
    setProgreso(0);
    setTiempoEjecucion('0.0s');
  };

  /**
   * Actualiza el tiempo de ejecución.
   * @param {string} tiempo Tiempo formateado (ej: "1.25s", "125ms").
   */
  const actualizarTiempo = (tiempo) => {
    setTiempoEjecucion(tiempo);
  };

  /**
   * Actualiza todas las estadísticas de una vez.
   *
   * @param {!Object} valores Objeto con las estadísticas a actualizar.
   * @param {number=} valores.movimientos Número de movimientos.
   * @param {number=} valores.retrocesos Número de retrocesos.
   * @param {number=} valores.progreso Porcentaje de progreso.
   * @param {string=} valores.tiempoEjecucion Tiempo de ejecución formateado.
   */
  const actualizarTodo = ({ movimientos: m, retrocesos: r, progreso: p, tiempoEjecucion: t }) => {
    if (m !== undefined) setMovimientos(m);
    if (r !== undefined) setRetrocesos(r);
    if (p !== undefined) setProgreso(Math.round(p));
    if (t !== undefined) setTiempoEjecucion(t);
  };

  /**
   * Actualiza solo progreso y estadísticas básicas (para actualizaciones durante ejecución).
   * @param {!Object} valores Objeto con movimientos, retrocesos y progreso.
   */
  const actualizarProgreso = ({ movimientos: m, retrocesos: r, progreso: p }) => {
    if (m !== undefined) setMovimientos(m);
    if (r !== undefined) setRetrocesos(r);
    if (p !== undefined) setProgreso(Math.round(p));
  };

  return {
    estadisticas: {
      movimientos,
      retrocesos,
      progreso,
      tiempoEjecucion,
    },
    reiniciar,
    actualizarTodo,
    actualizarProgreso,
    actualizarTiempo,
  };
}
