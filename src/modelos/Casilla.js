/**
 * @fileoverview Clase que representa una casilla individual del tablero.
 */

/**
 * Representa una casilla del tablero con su posición, estado de visitada y vecinos.
 * @class
 */
export class Casilla {
  /**
   * Crea una nueva instancia de Casilla.
   * @param {number} fila - La fila donde se encuentra la casilla (0-indexada).
   * @param {number} columna - La columna donde se encuentra la casilla (0-indexada).
   */
  constructor(fila, columna) {
    /** @type {number} La fila de la casilla en el tablero. */
    this.fila = fila;
    
    /** @type {number} La columna de la casilla en el tablero. */
    this.columna = columna;
    
    /** @type {boolean} Indica si la casilla ha sido visitada por el caballo. */
    this.visitada = false;
    
    /** @type {Array<Casilla>} Lista de casillas vecinas accesibles desde esta posición. */
    this.vecinos = [];
  }

  /**
   * Agrega una casilla vecina a la lista de vecinos accesibles.
   * @param {Casilla} casilla - La casilla vecina que se va a agregar.
   */
  agregarVecino(casilla) {
    this.vecinos.push(casilla);
  }
}

export default Casilla;