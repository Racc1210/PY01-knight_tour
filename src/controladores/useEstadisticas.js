/**
 * @fileoverview Hook personalizado para manejar las estadísticas del algoritmo.
 * Gestiona movimientos, retrocesos y progreso de la animación.
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

  /** Reinicia todas las estadísticas a 0. */
  const reiniciar = () => {
    setMovimientos(0);
    setRetrocesos(0);
    setProgreso(0);
  };

  /**
   * Actualiza todas las estadísticas de una vez.
   *
   * @param {!Object} valores Objeto con las estadísticas a actualizar.
   * @param {number=} valores.movimientos Número de movimientos.
   * @param {number=} valores.retrocesos Número de retrocesos.
   * @param {number=} valores.progreso Porcentaje de progreso.
   */
  const actualizarTodo = ({ movimientos: m, retrocesos: r, progreso: p }) => {
    if (m !== undefined) setMovimientos(m);
    if (r !== undefined) setRetrocesos(r);
    if (p !== undefined) setProgreso(Math.round(p));
  };

  return {
    estadisticas: {
      movimientos,
      retrocesos,
      progreso,
    },
    reiniciar,
    actualizarTodo,
  };
}
