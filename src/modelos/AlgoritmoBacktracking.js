/**
 * @fileoverview Algoritmo de backtracking para resolver el recorrido del caballo.
 * Permite calcular tanto recorridos abiertos como cerrados.
 */


/**
 * Intenta resolver el recorrido completo del caballo usando backtracking.
 *
 * @param {!Caballo} caballo Instancia del caballo en el tablero.
 * @param {boolean=} cerrado True si se busca un recorrido cerrado (por defecto false).
 * @return {boolean} True si se encontró un recorrido válido, false en caso contrario.
 */
export function resolverRecorrido(caballo, cerrado = false) {
  if (caballo.recorridoCompleto()) {
    if (cerrado) {
      return caballo.posicionActual.vecinos.some(
          (vecino) => vecino.casilla === caballo.casillaInicial);
    }
    return true;
  }

  
  const vecinosDisponibles = caballo.posicionActual.vecinos
      .filter((vecino) => !vecino.casilla.visitada && !vecino.intentado)
      .map((vecino) => vecino.casilla);

  if (vecinosDisponibles.length === 0) {
    return false;
  }

 
  vecinosDisponibles.sort(() => Math.random() - 0.5);

  
  for (const casilla of vecinosDisponibles) {
    caballo.avanzarA(casilla);

    if (resolverRecorrido(caballo, cerrado)) {
      return true;
    }

    caballo.retroceder();
  }

  return false;
}
