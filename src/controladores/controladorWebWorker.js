/**
 * @fileoverview Controlador para manejar la comunicación con el Web Worker.
 * Siguiendo el patrón MVC, actúa como intermediario entre el modelo (Worker) y la vista.
 */

/**
 * Controlador para gestionar Web Workers del algoritmo de backtracking.
 */
export class ControladorWebWorker {
    constructor() {
        this.worker = null;
        this.estaEjecutando = false;
        this.callbackProgreso = null;
        this.callbackCompletado = null;
        this.callbackError = null;
    }

    /**
     * Inicializa el Web Worker.
     * @return {boolean} True si se inicializó correctamente.
     */
    inicializar() {
        try {
            // Verificar soporte para Web Workers
            if (typeof Worker === 'undefined') {
                console.warn('Web Workers no están soportados en este navegador');
                return false;
            }

            this.worker = new Worker(new URL('../utilidades/backtracking-worker.js', import.meta.url), { type: 'module' });
            this.configurarEventos();
            return true;
        } catch (error) {
            console.error('Error al inicializar Web Worker:', error);
            return false;
        }
    }

    /**
     * Configura los eventos del Web Worker.
     */
    configurarEventos() {
        if (!this.worker) return;

        this.worker.onmessage = (event) => {
            const { tipo, datos } = event.data;

            switch (tipo) {
                case 'progreso':
                    this.manejarProgreso(datos);
                    break;

                case 'completado':
                    this.manejarCompletado(datos);
                    break;

                case 'error':
                    this.manejarError(datos);
                    break;

                default:
                    console.warn('Tipo de mensaje desconocido del worker:', tipo);
            }
        };

        this.worker.onerror = (error) => {
            console.error('Error en Web Worker:', error);
            this.estaEjecutando = false;
            if (this.callbackError) {
                this.callbackError({
                    mensaje: 'Error interno del Web Worker',
                    detalles: error.message,
                    tipo: 'worker_error'
                });
            }
        };

        this.worker.onmessageerror = (error) => {
            console.error('Error de mensaje en Web Worker:', error);
            this.estaEjecutando = false;
            if (this.callbackError) {
                this.callbackError({
                    mensaje: 'Error de comunicación con Web Worker (posible problema de memoria)',
                    detalles: 'Los datos enviados son demasiado grandes para ser clonados',
                    tipo: 'message_error'
                });
            }
        };
    }

    /**
     * Maneja actualizaciones de progreso del worker.
     * @param {Object} datos Datos de progreso del worker.
     */
    manejarProgreso(datos) {
        if (this.callbackProgreso) {
            this.callbackProgreso(datos);
        }
    }

    /**
     * Maneja la finalización del algoritmo.
     * @param {Object} datos Resultado final del worker.
     */
    manejarCompletado(datos) {
        this.estaEjecutando = false;
        if (this.callbackCompletado) {
            this.callbackCompletado(datos);
        }
    }

    /**
     * Maneja errores del worker.
     * @param {Object} datos Información del error.
     */
    manejarError(datos) {
        this.estaEjecutando = false;
        console.error('Error del Web Worker:', datos);
        if (this.callbackError) {
            this.callbackError(datos);
        }
    }

    /**
     * Ejecuta el algoritmo de backtracking en el worker.
     * @param {Object} parametros Parámetros para el algoritmo.
     * @param {number} parametros.tamano Tamaño del tablero.
     * @param {boolean} parametros.recorridoCerrado Si debe ser recorrido cerrado.
     * @param {number} parametros.filaInicial Fila inicial del caballo.
     * @param {number} parametros.columnaInicial Columna inicial del caballo.
     * @return {boolean} True si se inició correctamente.
     */
    ejecutarAlgoritmo(parametros) {
        if (this.estaEjecutando) {
            console.warn('El algoritmo ya está en ejecución');
            return false;
        }

        if (!this.worker) {
            if (!this.inicializar()) {
                return false;
            }
        }

        try {
            this.estaEjecutando = true;
            this.worker.postMessage({
                tipo: 'iniciar',
                datos: parametros
            });
            return true;
        } catch (error) {
            console.error('Error al enviar datos al worker:', error);
            this.estaEjecutando = false;
            return false;
        }
    }

    /**
     * Configura callback para actualizaciones de progreso.
     * @param {Function} callback Función a llamar con datos de progreso.
     */
    onProgreso(callback) {
        this.callbackProgreso = callback;
    }

    /**
     * Configura callback para cuando se complete el algoritmo.
     * @param {Function} callback Función a llamar con el resultado final.
     */
    onCompletado(callback) {
        this.callbackCompletado = callback;
    }

    /**
     * Configura callback para errores.
     * @param {Function} callback Función a llamar cuando ocurra un error.
     */
    onError(callback) {
        this.callbackError = callback;
    }

    /**
     * Detiene la ejecución actual del algoritmo.
     */
    detener() {
        if (this.worker && this.estaEjecutando) {
            this.worker.terminate();
            this.worker = null;
            this.estaEjecutando = false;
            
            // Reinicializar para futuros usos
            this.inicializar();
        }
    }

    /**
     * Termina el Web Worker de forma segura.
     */
    terminar() {
        if (this.worker) {
            this.worker.terminate();
            this.worker = null;
        }
        this.estaEjecutando = false;
        this.callbackProgreso = null;
        this.callbackCompletado = null;
        this.callbackError = null;
    }

    /**
     * Verifica si el algoritmo está ejecutándose.
     * @return {boolean} True si está en ejecución.
     */
    estaEnEjecucion() {
        return this.estaEjecutando;
    }

    /**
     * Verifica si Web Workers están disponibles.
     * @return {boolean} True si están soportados.
     */
    static esSoportado() {
        return typeof Worker !== 'undefined';
    }
}