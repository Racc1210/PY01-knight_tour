/**
 * @fileoverview Funciones para generar y controlar la animación
 * del algoritmo de backtracking. 
 */

/**
 * Genera el siguiente frame de la animación.
 *
 * @param {!Object} estadoActual Estado actual de la animación.
 * @param {!Array<!Object>} historial Historial completo del algoritmo.
 * @param {!Array<!Object>} solucion Solución final del algoritmo.
 * @return {!Object} Nuevo estado después del siguiente movimiento.
 */
export function generarSiguienteFrame(estadoActual, historial, solucion) {
  const {
    indiceHistorial,
    casillasVerdes,
    casillasRojas,
    contadorVisitas,
    contadorPasos,
  } = estadoActual;

  if (indiceHistorial >= historial.length) {
    return { ...estadoActual, completado: true };
  }

  const casillasVerdesMarcadas = new Map(casillasVerdes);
  const casillasRojasMarcadas = new Set(casillasRojas);
  const nuevoContadorVisitas = new Map(contadorVisitas);
  let nuevoContadorPasos = contadorPasos;

  const casillaActual = historial[indiceHistorial];
  const coordenadaActual = `${casillaActual.fila},${casillaActual.columna}`;

  let esBacktracking = false;
  if (indiceHistorial > 0) {
    esBacktracking = casillasVerdesMarcadas.has(coordenadaActual);
  }

  if (esBacktracking) {
    if (indiceHistorial > 0) {
      const casillaAnterior = historial[indiceHistorial - 1];
      const coordenadaAnterior = `${casillaAnterior.fila},${casillaAnterior.columna}`;

      casillasRojasMarcadas.add(coordenadaAnterior);
      casillasVerdesMarcadas.delete(coordenadaAnterior);
      nuevoContadorPasos--;
    }
  } else {
    casillasRojasMarcadas.delete(coordenadaActual);
    casillasVerdesMarcadas.set(coordenadaActual, nuevoContadorPasos);
    nuevoContadorPasos++;
  }

  const visitas = (nuevoContadorVisitas.get(coordenadaActual) || 0) + 1;
  nuevoContadorVisitas.set(coordenadaActual, visitas);

  const posicionCaballo = {
    fila: casillaActual.fila,
    columna: casillaActual.columna,
  };

  const movimientosRealizados = casillasVerdesMarcadas.size;

  return {
    indiceHistorial: indiceHistorial + 1,
    casillasVerdes: casillasVerdesMarcadas,
    casillasRojas: casillasRojasMarcadas,
    contadorVisitas: nuevoContadorVisitas,
    contadorPasos: nuevoContadorPasos,
    numerosRojos: new Map(),
    numeroMovimientoActual: nuevoContadorPasos,
    movimientosRealizados,
    movimientosProgreso: indiceHistorial + 1,
    posicionCaballo,
    completado: false,
  };
}

/**
 * Crea el estado inicial para la animación.
 *
 * @return {!Object} Estado inicial de la animación.
 */
export function crearEstadoInicialAnimacion() {
  return {
    indiceHistorial: 0,
    casillasVerdes: new Map(),
    casillasRojas: new Set(),
    contadorVisitas: new Map(),
    contadorPasos: 1,
    numerosRojos: new Map(),
    numeroMovimientoActual: 1,
    movimientosRealizados: 0,
    movimientosProgreso: 0,
    posicionCaballo: null,
    completado: false,
  };
}

/**
 * Genera el mapa de numeración basado en la solución final.
 *
 * @param {!Array<!Object>} solucion Array de casillas en el orden de la solución.
 * @return {!Map<string, number>} Mapa de coordenada para obtener el número de movimiento.
 */
export function generarMapaSolucion(solucion) {
  const mapa = new Map();
  for (let i = 0; i < solucion.length; i++) {
    const casilla = solucion[i];
    const coordenada = `${casilla.fila},${casilla.columna}`;
    mapa.set(coordenada, i + 1);
  }
  return mapa;
}

/**
 * Calcula el progreso de la animación con precision de 2 decimales.
 *
 * @param {number} movimientosProgreso Movimientos realizados en la animación.
 * @param {number} totalMovimientos Total de movimientos en el historial.
 * @return {number} Porcentaje de progreso.
 */
export function calcularProgreso(movimientosProgreso, totalMovimientos) {
  if (totalMovimientos === 0) {
    return 0;
  }
  const porcentaje = (movimientosProgreso / totalMovimientos) * 100;
  return Math.round(porcentaje * 100) / 100;
}
