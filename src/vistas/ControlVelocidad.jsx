import React, { useState } from 'react';
import '../estilos/control-velocidad.css';

function ControlVelocidad({ onPausar, onReiniciar }) {
    const [velocidad, setVelocidad] = useState(2);

    const velocidades = [
        { valor: 1, etiqueta: '1x' },
        { valor: 2, etiqueta: '2x' },
        { valor: 3, etiqueta: '3x' },
        { valor: 4, etiqueta: '4x' }
    ];

    return (
        <div className="control-velocidad-container">
            <h3>Control</h3>
            
            <div className="velocidad-section">
                <label>Velocidad (10 mov/s)</label>
                <div className="velocidad-opciones">
                    {velocidades.map((opcion) => (
                        <button
                            key={opcion.valor}
                            className={`velocidad-boton ${velocidad === opcion.valor ? 'activo' : ''}`}
                            onClick={() => setVelocidad(opcion.valor)}
                        >
                            {opcion.etiqueta}
                        </button>
                    ))}
                </div>
            </div>
            
            <div className="botones-control">
                <button className="boton-control pausar" onClick={onPausar}>
                    Pausar
                </button>
                <button className="boton-control reiniciar" onClick={onReiniciar}>
                    Reiniciar
                </button>
            </div>
        </div>
    );
}

export default ControlVelocidad;