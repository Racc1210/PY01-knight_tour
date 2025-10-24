/**
 * @fileoverview Hook personalizado para manejar el estado del tablero.
 * Gestiona tamaño, posición del caballo, casillas visitadas, retrocesos
 * y solución final. Forma parte de la capa de modelo en la arquitectura MVC.
 */

import { useState } from 'react';
import { extraerTamanoTablero } from '../utilidades/auxiliares.js';

/**
 * Hook para gestionar el estado del tablero.
 *
 * @param {number=} tamanoInicial Tamaño inicial del tablero (default 5).
 * @return {!Object} Estado y funciones para manipular el tablero.
 */
export function useEstadoTablero(tamanoInicial = 5) {
  const [tamanoTablero, setTamanoTablero] = useState(tamanoInicial);
  const [posicionCaballo, setPosicionCaballo] = useState(null);
  const [posicionSeleccionada, setPosicionSeleccionada] = useState(null);
  const [casillasVisitadas, setCasillasVisitadas] = useState(new Map());
  const [casillasBacktracking, setCasillasBacktracking] = useState(new Set());
  const [numerosBacktracking, setNumerosBacktracking] = useState(new Map());
  const [posiblesMovimientos, setPosiblesMovimientos] = useState(new Set());
  const [solucionFinal, setSolucionFinal] = useState({
    tamano: 0,
    solucion: new Map(),
  });

  /**
   * Cambia el tamaño del tablero y reinicia el estado.
   *
   * @param {number|string} nuevoTamano Nuevo tamaño (ej. 5 o "5x5").
   */
  const cambiarTamano = (nuevoTamano) => {
    const n = extraerTamanoTablero(nuevoTamano);
    setTamanoTablero(n);
    setPosicionSeleccionada(null);
    setPosicionCaballo(null);
    limpiarTablero();
    limpiarSolucion();
  };

  /**
   * Selecciona la posición inicial del caballo.
   *
   * @param {number} fila Fila seleccionada.
   * @param {number} columna Columna seleccionada.
   */
  const seleccionarPosicion = (fila, columna) => {
    setPosicionSeleccionada({ fila, columna });
    setPosicionCaballo({ fila, columna });
  };

  /** Limpia todas las marcas del tablero. */
  const limpiarTablero = () => {
    setCasillasVisitadas(new Map());
    setCasillasBacktracking(new Set());
    setNumerosBacktracking(new Map());
    setPosiblesMovimientos(new Set());
  };

  /** Limpia la solución final almacenada. */
  const limpiarSolucion = () => {
    setSolucionFinal({
      tamano: 0,
      solucion: new Map(),
    });
  };

  /**
   * Actualiza las casillas visitadas.
   *
   * @param {!Map<string, number>} nuevasCasillas Casillas visitadas.
   */
  const actualizarCasillasVisitadas = (nuevasCasillas) => {
    setCasillasVisitadas(new Map(nuevasCasillas));
  };

  /**
   * Actualiza las casillas en retroceso.
   *
   * @param {!Set<string>} nuevasCasillas Casillas en backtracking.
   */
  const actualizarCasillasBacktracking = (nuevasCasillas) => {
    setCasillasBacktracking(new Set(nuevasCasillas));
  };

  /**
   * Actualiza los números de retroceso.
   *
   * @param {!Map<string, number>} nuevosNumeros Números de backtracking.
   */
  const actualizarNumerosBacktracking = (nuevosNumeros) => {
    setNumerosBacktracking(new Map(nuevosNumeros));
  };

  /**
   * Actualiza la posición actual del caballo.
   *
   * @param {?Object} nuevaPosicion Nueva posición {fila, columna}.
   */
  const actualizarPosicionCaballo = (nuevaPosicion) => {
    setPosicionCaballo(nuevaPosicion);
  };

  /**
   * Establece la solución final encontrada.
   *
   * @param {number} tamano Tamaño del tablero.
   * @param {!Map<string, number>} solucion Mapa de coordenadas -> número.
   */
  const establecerSolucion = (tamano, solucion) => {
    setSolucionFinal({ tamano, solucion: new Map(solucion) });
  };

  return {
    tamanoTablero,
    posicionCaballo,
    posicionSeleccionada,
    casillasVisitadas,
    casillasBacktracking,
    numerosBacktracking,
    posiblesMovimientos,
    solucionFinal,

    cambiarTamano,
    seleccionarPosicion,
    limpiarTablero,
    limpiarSolucion,
    actualizarCasillasVisitadas,
    actualizarCasillasBacktracking,
    actualizarNumerosBacktracking,
    actualizarPosicionCaballo,
    establecerSolucion,
  };
}
