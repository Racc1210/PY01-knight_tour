import React, { useState, useEffect } from 'react';
import '../estilos/controles.css';

function Controles({ onIniciar, onDetener, animacionActiva = false, onCambioTamano, posicionSeleccionada = null, onCambioInput = null }) {
    const [tamano, setTamano] = useState('5x5');
    const [recorridoCerrado, setRecorridoCerrado] = useState(false);
    const [recorridoAbierto, setRecorridoAbierto] = useState(true);
    const [filaInicial, setFilaInicial] = useState('');
    const [columnaInicial, setColumnaInicial] = useState('');

    // Actualizar inputs cuando se selecciona una casilla desde el tablero
    useEffect(() => {
        if (posicionSeleccionada !== null) {
            setFilaInicial(posicionSeleccionada.fila.toString());
            setColumnaInicial(posicionSeleccionada.columna.toString());
        }
    }, [posicionSeleccionada]);

    const manejarCambioFila = (valor) => {
        setFilaInicial(valor);
        const fila = parseInt(valor);
        const columna = parseInt(columnaInicial);
        const n = parseInt(tamano.split('x')[0]);
        
        // Si ambos valores son válidos, notificar al padre
        if (!isNaN(fila) && !isNaN(columna) && fila >= 0 && fila < n && columna >= 0 && columna < n && onCambioInput) {
            onCambioInput({ fila, columna });
        }
    };

    const manejarCambioColumna = (valor) => {
        setColumnaInicial(valor);
        const fila = parseInt(filaInicial);
        const columna = parseInt(valor);
        const n = parseInt(tamano.split('x')[0]);
        
        // Si ambos valores son válidos, notificar al padre
        if (!isNaN(fila) && !isNaN(columna) && fila >= 0 && fila < n && columna >= 0 && columna < n && onCambioInput) {
            onCambioInput({ fila, columna });
        }
    };

    const manejarIniciar = () => {
        // Validar inputs
        const fila = parseInt(filaInicial);
        const columna = parseInt(columnaInicial);
        const n = parseInt(tamano.split('x')[0]);
        
        if (isNaN(fila) || isNaN(columna)) {
            alert('Por favor ingrese números válidos para la posición inicial');
            return;
        }
        
        if (fila < 0 || fila >= n || columna < 0 || columna >= n) {
            alert(`La posición debe estar entre 0 y ${n-1} para un tablero ${tamano}`);
            return;
        }
        
        // Determinar tipo de recorrido
        const esCerrado = recorridoCerrado && !recorridoAbierto;
        
        // Enviar configuración al App
        onIniciar({
            tamano,
            recorridoCerrado: esCerrado,
            filaInicial: fila,
            columnaInicial: columna
        });
    };

    const manejarCambioTamano = (nuevoTamano) => {
        setTamano(nuevoTamano);
        // Notificar al componente padre para actualizar el tablero inmediatamente
        if (onCambioTamano) {
            const n = parseInt(nuevoTamano.split('x')[0]);
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
                    disabled={animacionActiva}
                >
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
                        max={parseInt(tamano.split('x')[0]) - 1}
                    />
                    <input
                        type="number"
                        placeholder="Columna"
                        value={columnaInicial}
                        onChange={(e) => manejarCambioColumna(e.target.value)}
                        className="input-posicion"
                        min="0"
                        max={parseInt(tamano.split('x')[0]) - 1}
                    />
                </div>
            </div>
            
            {!animacionActiva ? (
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