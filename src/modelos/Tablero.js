/**
 * @fileoverview Clase que representa el tablero nxn con todas sus casillas.
 */

import { Casilla } from './Casilla.js';

/**
 * Representa un tablero de ajedrez con casillas interconectadas según
 * los movimientos válidos del caballo.
 * @class
 */
export class Tablero {
  /**
   * Crea una nueva instancia del Tablero.
   * @param {number} n - El tamaño del tablero (n x n casillas).
   */
  constructor(n) {
    /** @type {number} El tamaño del tablero (número de filas y columnas). */
    this.n = n;
    
    /** @type {Array<Array<Casilla>>} Matriz de casillas. */
    this.casillas = [];
    
    this._crearCasillas();
    this._asignarVecinos();
  }

  /**
   * Crea la matriz de casillas del tablero.
   * @private
   */
  _crearCasillas() {
    for (let fila = 0; fila < this.n; fila++) {
      this.casillas[fila] = [];
      for (let columna = 0; columna < this.n; columna++) {
        this.casillas[fila][columna] = new Casilla(fila, columna);
      }
    }
  }

  /**
   * Asigna los vecinos accesibles a cada casilla según los movimientos del caballo.
   * @private
   */
  _asignarVecinos() {
    
    const movimientosFila = [2, 1, -1, -2, -2, -1, 1, 2];
    const movimientosColumna = [1, 2, 2, 1, -1, -2, -2, -1];

    for (let fila = 0; fila < this.n; fila++) {
      for (let columna = 0; columna < this.n; columna++) {
        for (let i = 0; i < 8; i++) {
          const filaCasilla = fila + movimientosFila[i];
          const columnaCasilla = columna + movimientosColumna[i];
          
          // Verificar que la nueva posición esté dentro del tablero
          if (filaCasilla >= 0 && filaCasilla < this.n && 
              columnaCasilla >= 0 && columnaCasilla < this.n) {
            this.casillas[fila][columna].agregarVecino(
              this.casillas[filaCasilla][columnaCasilla]
            );
          }
        }
      }
    }
  }

  /**
   * Obtiene la casilla en la posición especificada.
   * @param {number} fila - La fila de la casill.
   * @param {number} columna - La columna de la casilla.
   * @returns {Casilla} La casilla en la posición especificada.
   * @throws {Error} Si las coordenadas están fuera del tablero.
   */
  obtenerCasilla(fila, columna) {
    if (fila < 0 || fila >= this.n || columna < 0 || columna >= this.n) {
      throw new Error(`Posición fuera del tablero: (${fila}, ${columna})`);
    }
    return this.casillas[fila][columna];
  }
}

export default Tablero;