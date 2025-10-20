/**
 * @fileoverview Clase que representa el caballo en el tablero y maneja su movimiento.
 */

/**
 * Representa el caballo con su posición actual, historial de movimientos
 * y estadísticas del recorrido.
 * @class
 */
export class Caballo {
  /**
   * Crea una nueva instancia del Caballo.
   * @param {Casilla} casillaInicial - Casilla donde comienza el recorrido.
   * @param {number} totalCasillas - Total de casillas del tablero 
   */
  constructor(casillaInicial, totalCasillas) {
    /** @type {Casilla} La casilla donde se encuentra actualmente el caballo. */
    this.posicionActual = casillaInicial;
    
    /** @type {Array<Casilla>} Historial de todas las casillas visitadas. */
    this.historial = [casillaInicial];
    
    /** @type {number} Contador de movimientos realizados. */
    this.movimientos = 0;
    
    /** @type {number} Contador de retrocesos realizados. */
    this.retrocesos = 0;
    
    /** @type {number} Número de casillas visitadas actualmente. */
    this.casillasVisitadas = 1;
    
    /** @type {number} Total de casillas en el tablero. */
    this.totalCasillas = totalCasillas;
    
    
    casillaInicial.visitada = true;
  }

  /**
   * Mueve el caballo a una nueva casilla y actualiza el estado.
   * @param {Casilla} nuevaCasilla - La casilla destino del movimiento.
   */
  avanzarA(nuevaCasilla) {
    this.posicionActual = nuevaCasilla;
    this.historial.push(nuevaCasilla);
    this.movimientos++;
    nuevaCasilla.visitada = true;
    this.casillasVisitadas++;
  }

  /**
   * Retrocede el caballo a la casilla anterior en el historial.
   * Desmarca la casilla actual como visitada y actualiza las estadísticas.
   */
  retroceder() {
    if (this.historial.length > 1) {
      const ultima = this.historial.pop();
      ultima.visitada = false;
      this.posicionActual = this.historial[this.historial.length - 1];
      this.retrocesos++;
      this.casillasVisitadas--;
    }
  }

  /**
   * Verifica si el caballo ha completado el recorrido visitando todas las casillas.
   * @returns {boolean} True si se han visitado todas las casillas, false en caso contrario.
   */
  recorridoCompleto() {
    return this.casillasVisitadas === this.totalCasillas;
  }

  /**
   * Reinicia el estado del caballo a la casilla inicial.
   * Limpia el historial y restablece todos los contadores.
   * @param {Casilla} casillaInicial - La casilla donde reiniciar el caballo.
   */
  reiniciar(casillaInicial) {
    // Desmarcar todas las casillas visitadas
    for (let i = 0; i < this.historial.length; i++) {
      this.historial[i].visitada = false;
    }
    
    // Reiniciar estado
    this.historial = [casillaInicial];
    this.posicionActual = casillaInicial;
    this.movimientos = 0;
    this.retrocesos = 0;
    this.casillasVisitadas = 1;
    casillaInicial.visitada = true;
  }
}

export default Caballo;