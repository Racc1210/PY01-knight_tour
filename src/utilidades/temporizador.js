/**
 * @fileoverview Clase para medir tiempo de ejecución de forma precisa.
 */

/**
 * Clase para medir tiempo de ejecución.
 */
export class Temporizador {
    constructor() {
        this.tiempoInicio = null;
        this.tiempoFin = null;
        this.duracion = 0;
        this.enEjecucion = false;
    }

    /**
     * Inicia la medición de tiempo.
     */
    iniciar() {
        this.tiempoInicio = performance.now();
        this.tiempoFin = null;
        this.duracion = 0;
        this.enEjecucion = true;
    }

    /**
     * Detiene la medición de tiempo.
     * @return {number} Duración en milisegundos.
     */
    detener() {
        if (!this.enEjecucion) {
            return this.duracion;
        }

        this.tiempoFin = performance.now();
        this.duracion = this.tiempoFin - this.tiempoInicio;
        this.enEjecucion = false;
        return this.duracion;
    }

    /**
     * Obtiene el tiempo transcurrido sin detener el temporizador.
     * @return {number} Tiempo transcurrido en milisegundos.
     */
    obtenerTiempoTranscurrido() {
        if (!this.enEjecucion) {
            return this.duracion;
        }
        return performance.now() - this.tiempoInicio;
    }

    /**
     * Obtiene el tiempo en formato de segundos, una vez se superen los mil milisegundos.
     * @param {number=} decimales Número de decimales para segundos.
     * @return {string} Tiempo formateado.
     */
    obtenerTiempoFormateado(decimales = 2) {
        const tiempo = this.enEjecucion ? this.obtenerTiempoTranscurrido() : this.duracion;
        
        if (tiempo < 1000) {
            return `${Math.round(tiempo)}ms`;
        } else {
            return `${(tiempo / 1000).toFixed(decimales)}s`;
        }
    }

    /**
     * Reinicia el temporizador.
     */
    reiniciar() {
        this.tiempoInicio = null;
        this.tiempoFin = null;
        this.duracion = 0;
        this.enEjecucion = false;
    }

    /**
     * Verifica si el temporizador está en ejecución.
     * @return {boolean} True si está midiendo tiempo.
     */
    estaEnEjecucion() {
        return this.enEjecucion;
    }
}

/**
 * Función asincrona para medir tiempo de ejecución de una función.
 * @param {Function} funcion Función a medir.
 * @return {Promise<{resultado: any, tiempo: string}>} Resultado y tiempo formateado.
 */
export async function medirTiempo(funcion) {
    const temporizador = new Temporizador();
    temporizador.iniciar();
    
    try {
        const resultado = await funcion();
        temporizador.detener();
        
        return {
            resultado,
            tiempo: temporizador.obtenerTiempoFormateado()
        };
    } catch (error) {
        temporizador.detener();
        throw error;
    }
}