// Validaciones y funciones de apoyo

/**
 * Extrae el tamaño numérico de un string de formato "NxN"
 * @param {string} tamanoString - String en formato "8x8", "6x6", etc.
 * @returns {number} El valor N del tablero
 */
export const extraerTamanoTablero = (tamanoString) => {
  return parseInt(tamanoString.toString().split('x')[0], 10);
};

/**
 * Valida si un número está dentro del rango válido [0, max)
 * @param {number} valor - El valor a validar
 * @param {number} max - El límite superior (exclusivo)
 * @returns {boolean} true si está en rango válido
 */
const esCoordenadaValida = (valor, max) => {
  return !isNaN(valor) && valor >= 0 && valor < max;
};

/**
 * Valida si un par de coordenadas está dentro de los límites del tablero
 * @param {number} fila - La coordenada de fila
 * @param {number} columna - La coordenada de columna  
 * @param {number} tamanoTablero - El tamaño del tablero (N para NxN)
 * @returns {boolean} true si ambas coordenadas son válidas
 */
export const sonCoordenadasValidasEnTablero = (fila, columna, tamanoTablero) => {
  return esCoordenadaValida(fila, tamanoTablero) && 
         esCoordenadaValida(columna, tamanoTablero);
};

/**
 * Convierte un valor a entero y valida que sea un número válido
 * @param {any} valor - El valor a convertir
 * @returns {number|null} El valor convertido o null si no es válido
 */
const convertirAEnteroValido = (valor) => {
  const entero = parseInt(valor, 10);
  return isNaN(entero) ? null : entero;
};

/**
 * Valida y convierte coordenadas de entrada del usuario
 * @param {string|number} fila - Valor de fila a validar
 * @param {string|number} columna - Valor de columna a validar
 * @param {string} tamanoString - String de tamaño en formato "NxN"
 * @returns {object} Objeto con {validas: boolean, fila: number, columna: number, n: number}
 */
export const validarCoordenadas = (fila, columna, tamanoString) => {
  const n = extraerTamanoTablero(tamanoString);
  const filaNum = convertirAEnteroValido(fila);
  const columnaNum = convertirAEnteroValido(columna);
  
  const validas = filaNum !== null && 
                  columnaNum !== null && 
                  sonCoordenadasValidasEnTablero(filaNum, columnaNum, n);
  
  return {
    validas,
    fila: filaNum,
    columna: columnaNum,
    n
  };
};

