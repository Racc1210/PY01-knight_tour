import React, { useState, useEffect } from 'react';
import { validarCoordenadas, extraerTamanoTablero } from '../utilidades/auxiliares.js';
import '../estilos/controles.css';

function Controles({ onIniciar, onDetener, mostrarDetener = false, animacionActiva = false, onCambioTamano, posicionSeleccionada = null, onCambioInput = null }) {
    const [tamano, setTamano] = useState('5x5');
    const [recorridoCerrado, setRecorridoCerrado] = useState(false);
    const [recorridoAbierto, setRecorridoAbierto] = useState(true);
    const [filaInicial, setFilaInicial] = useState('');
    const [columnaInicial, setColumnaInicial] = useState('');

    useEffect(() => {
        if (posicionSeleccionada !== null) {
            setFilaInicial(posicionSeleccionada.fila.toString());
            setColumnaInicial(posicionSeleccionada.columna.toString());
        }
    }, [posicionSeleccionada]);

    const manejarCambioFila = (valor) => {
        setFilaInicial(valor);
        const validacion = validarCoordenadas(valor, columnaInicial, tamano);
        
        if (validacion.validas && onCambioInput) {
            onCambioInput({ fila: validacion.fila, columna: validacion.columna });
        }
    };

    const manejarCambioColumna = (valor) => {
        setColumnaInicial(valor);
        const validacion = validarCoordenadas(filaInicial, valor, tamano);
        
        if (validacion.validas && onCambioInput) {
            onCambioInput({ fila: validacion.fila, columna: validacion.columna });
        }
    };

    const manejarIniciar = () => {
        const validacion = validarCoordenadas(filaInicial, columnaInicial, tamano);
        
        if (!validacion.validas) {
            if (validacion.fila === null || validacion.columna === null) {
                alert('Por favor ingrese números válidos para la posición inicial');
            } else {
                alert(`La posición debe estar entre 0 y ${validacion.n-1} para un tablero ${tamano}`);
            }
            return;
        }
        
        const esCerrado = recorridoCerrado && !recorridoAbierto;
        
        onIniciar({
            tamano,
            recorridoCerrado: esCerrado,
            filaInicial: validacion.fila,
            columnaInicial: validacion.columna
        });
    };

    const manejarCambioTamano = (nuevoTamano) => {
        setTamano(nuevoTamano);
        if (onCambioTamano) {
            const n = extraerTamanoTablero(nuevoTamano);
            onCambioTamano(n);
        }
    };

    const manejarDetener = () => {
        if (onDetener) {
            onDetener();
        }
    };

    return (
        <div className="controles-container">
            <div className="control-grupo">
                <label>Tamaño</label>
                <select 
                    value={tamano} 
                    onChange={(e) => manejarCambioTamano(e.target.value)}
                    className="selector-tamano"
                    disabled={animacionActiva || mostrarDetener}
                >   
                    <option value="4x4">4x4</option>
                    <option value="5x5">5x5</option>
                    <option value="6x6">6x6</option>
                    <option value="7x7">7x7</option>
                </select>
            </div>
            
            <div className="control-grupo">
                <label>Recorrida</label>
                <div className="checkbox-group">
                    <div className="checkbox-container">
                        <input
                            type="checkbox"
                            id="cerrado"
                            checked={recorridoCerrado}
                            onChange={(e) => {
                                setRecorridoCerrado(e.target.checked);
                                if (e.target.checked) {
                                    setRecorridoAbierto(false);
                                }
                            }}
                            className="checkbox-custom"
                            disabled={mostrarDetener}
                        />
                        <label htmlFor="cerrado" className="checkbox-label">Cerrado</label>
                    </div>
                    
                    <div className="checkbox-container">
                        <input
                            type="checkbox"
                            id="abierto"
                            checked={recorridoAbierto}
                            onChange={(e) => {
                                setRecorridoAbierto(e.target.checked);
                                if (e.target.checked) {
                                    setRecorridoCerrado(false);
                                }
                            }}
                            className="checkbox-custom"
                            disabled={mostrarDetener}
                        />
                        <label htmlFor="abierto" className="checkbox-label">Abierto</label>
                    </div>
                </div>
            </div>
            
            <div className="control-grupo">
                <label>Posición Inicial</label>
                <div className="posicion-inputs">
                    <input
                        type="number"
                        placeholder="Fila"
                        value={filaInicial}
                        onChange={(e) => manejarCambioFila(e.target.value)}
                        className="input-posicion"
                        min="0"
                        max={extraerTamanoTablero(tamano) - 1}
                        disabled={mostrarDetener}
                    />
                    <input
                        type="number"
                        placeholder="Columna"
                        value={columnaInicial}
                        onChange={(e) => manejarCambioColumna(e.target.value)}
                        className="input-posicion"
                        min="0"
                        max={extraerTamanoTablero(tamano) - 1}
                        disabled={mostrarDetener}
                    />
                </div>
            </div>
            
            {!mostrarDetener ? (
                <button className="boton-iniciar" onClick={manejarIniciar}>
                    Iniciar
                </button>
            ) : (
                <button className="boton-detener" onClick={manejarDetener}>
                    Detener
                </button>
            )}
        </div>
    );
}

export default Controles;