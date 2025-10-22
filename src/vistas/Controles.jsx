import React, { useState } from 'react';
import '../estilos/controles.css';

function Controles({ onIniciar }) {
    const [tamano, setTamano] = useState('4x4');
    const [recorridoCerrado, setRecorridoCerrado] = useState(false);
    const [recorridoAbierto, setRecorridoAbierto] = useState(true);
    const [filaInicial, setFilaInicial] = useState('');
    const [columnaInicial, setColumnaInicial] = useState('');

    return (
        <div className="controles-container">
            <div className="control-grupo">
                <label>Tamaño</label>
                <select 
                    value={tamano} 
                    onChange={(e) => setTamano(e.target.value)}
                    className="selector-tamano"
                >
                    <option value="4x4">4x4</option>
                    <option value="5x5">5x5</option>
                    <option value="6x6">6x6</option>
                    <option value="7x7">7x7</option>
                    <option value="8x8">8x8</option>
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
                            onChange={(e) => setRecorridoCerrado(e.target.checked)}
                            className="checkbox-custom"
                        />
                        <label htmlFor="cerrado" className="checkbox-label">Cerrado</label>
                    </div>
                    
                    <div className="checkbox-container">
                        <input
                            type="checkbox"
                            id="abierto"
                            checked={recorridoAbierto}
                            onChange={(e) => setRecorridoAbierto(e.target.checked)}
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
                        type="text"
                        placeholder="Fila"
                        value={filaInicial}
                        onChange={(e) => setFilaInicial(e.target.value)}
                        className="input-posicion"
                    />
                    <input
                        type="text"
                        placeholder="Columna"
                        value={columnaInicial}
                        onChange={(e) => setColumnaInicial(e.target.value)}
                        className="input-posicion"
                    />
                </div>
            </div>
            
            <button className="boton-iniciar" onClick={onIniciar}>
                Iniciar
            </button>
        </div>
    );
}

export default Controles;