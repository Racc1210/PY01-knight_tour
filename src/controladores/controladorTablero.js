/**
 * @fileoverview Controlador para procesar los datos del tablero antes de mostrarlos en la vista.
 * Implementa la lógica MVC separando el procesamiento de datos de la presentación.
 */

/**
 * Procesa los datos del estado del tablero para la vista.
 *
 * @param {number} tamano Tamaño del tablero (número de filas y columnas).
 * @param {?Object} posicionCaballo Posición actual del caballo, con {fila, columna}.
 * @param {!Map<string, number>} casillasVisitadas Casillas visitadas con sus números.
 * @param {!Set<string>} casillasBacktracking Casillas marcadas en retroceso.
 * @param {!Set<string>} posiblesMovimientos Casillas disponibles como próximos movimientos.
 * @return {!Map<string, Object>} Datos procesados para cada casilla.
 */
export function procesarDatosTablero(
    tamano,
    posicionCaballo,
    casillasVisitadas,
    casillasBacktracking,
    posiblesMovimientos) {
  const datosCasillas = new Map();

  for (let fila = 0; fila < tamano; fila++) {
    for (let columna = 0; columna < tamano; columna++) {
      const clave = `${fila},${columna}`;

      const esVisitada = casillasVisitadas.has(clave);
      const esBacktracking = casillasBacktracking.has(clave);
      const esPosibleMovimiento = posiblesMovimientos.has(clave);
      const tieneCaballo = Boolean(
          posicionCaballo &&
          posicionCaballo.fila === fila &&
          posicionCaballo.columna === columna);

      const numeroMovimiento = esVisitada ? casillasVisitadas.get(clave) : null;

      datosCasillas.set(clave, {
        numeroMovimiento,
        esVisitada,
        esBacktracking,
        esPosibleMovimiento,
        tieneCaballo,
      });
    }
  }

  return datosCasillas;
}

/**
 * Obtiene los datos procesados de una casilla específica.
 *
 * @param {!Map<string, Object>} datosProcesados Datos procesados del tablero.
 * @param {number} fila Fila de la casilla.
 * @param {number} columna Columna de la casilla.
 * @return {!Object} Datos de la casilla.
 */
export function obtenerDatosCasilla(datosProcesados, fila, columna) {
  const clave = `${fila},${columna}`;
  return datosProcesados.get(clave) || {
    numeroMovimiento: null,
    esVisitada: false,
    esBacktracking: false,
    esPosibleMovimiento: false,
    tieneCaballo: false,
  };
}
