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

    /** @type {Casilla} La casilla donde inicia el caballo. Se guarda en caso de hacer el recorrido cerrado*/
    this.casillaInicial = casillaInicial;
    
    /** @type {Array<Casilla>} Historial completo de movimientos (incluye retrocesos). */
    this.historial = [casillaInicial];
    
    /** @type {Array<Casilla>} Camino actual hacia la solución (sin retrocesos). */
    this.solucion = [casillaInicial];
    
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
   * Marca el vecino como intentado desde la casilla actual.
   * @param {Casilla} nuevaCasilla - La casilla destino del movimiento.
   */
  avanzarA(nuevaCasilla) {
    // marcar que desde la casilla actual se intentó este vecino
    for (let vecino of this.posicionActual.vecinos) {
      if (vecino.casilla === nuevaCasilla) {
        vecino.intentado = true;
        break;
      }
    }

    this.posicionActual = nuevaCasilla;
    
    
    if (this.historial.length < 100_000) {
      this.historial.push(nuevaCasilla);
    }
    
    this.solucion.push(nuevaCasilla); 
    this.movimientos++;
    nuevaCasilla.visitada = true;
    this.casillasVisitadas++;
    
  }

  /**
   * Retrocede el caballo a la casilla anterior en el historial.
   * Desmarca la casilla actual como visitada y actualiza las estadísticas.
   */
  retroceder() {
    if (this.solucion.length > 1) {
      const ultima = this.solucion.pop(); 
      ultima.visitada = false;

      const anterior = this.solucion[this.solucion.length - 1];

      
      if (this.historial.length < 100_000) {
        this.historial.push(anterior);
      }

      // resetear el intento en el vecino
      for (let vecino of anterior.vecinos) {
        if (vecino.casilla === ultima) {
          vecino.intentado = false;
          break;
        }
      }

      this.posicionActual = anterior;
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
    for (let i = 0; i < this.solucion.length; i++) {
      this.solucion[i].visitada = false;
    }
    
    this.historial = [casillaInicial];    
    this.solucion = [casillaInicial];     
    this.posicionActual = casillaInicial;
    this.movimientos = 0;
    this.retrocesos = 0;
    this.casillasVisitadas = 1;
    casillaInicial.visitada = true;
  }
}

export default Caballo;
