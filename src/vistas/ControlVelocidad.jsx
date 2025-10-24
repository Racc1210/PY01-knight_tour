import React, { useState, useEffect } from 'react';
import '../estilos/control-velocidad.css';

function ControlVelocidad({ 
    velocidadInicial = 1,
    onCambioVelocidad = null,
    onPausar = null,
    onReanudar = null,
    onReiniciar = null,
    miniTableroSolucion = null
}) {
    const velocidadesDisponibles = [1, 5, 10, 20, 30, 50, 100];
    const [velocidad, setVelocidad] = useState(velocidadInicial);
    const [pausado, setPausado] = useState(false);

    useEffect(() => {
        if (onCambioVelocidad) {
            onCambioVelocidad(velocidad);
        }
    }, [velocidad, onCambioVelocidad]);

    const manejarCambioVelocidad = (nuevaVelocidad) => {
        setVelocidad(nuevaVelocidad);
    };

    const manejarPausaReanudar = () => {
        if (pausado) {
            if (onReanudar) onReanudar();
        } else {
            if (onPausar) onPausar();
        }
        setPausado(!pausado);
    };

    const manejarReiniciar = () => {
        if (onReiniciar) onReiniciar();
        setPausado(false);
    };

    return (
        <div className="control-velocidad-container">
            <h3>Velocidad de movimiento</h3>
            
            <div className="velocidad-section">
                <div className="velocidad-info">
                    <label>{velocidad} mov/seg</label>
                </div>

                <div className="velocidad-slider-container">
                    <input
                        type="range"
                        min="0"
                        max={velocidadesDisponibles.length - 1}
                        step="1"
                        value={velocidadesDisponibles.indexOf(velocidad)}
                        onChange={(e) => manejarCambioVelocidad(velocidadesDisponibles[parseInt(e.target.value)])}
                        className="slider"
                    />
                    <div className="slider-marcas">
                        <span>1</span>
                        <span>5</span>
                        <span>10</span>
                        <span>20</span>
                        <span>30</span>
                        <span>50</span>
                        <span>100</span>

                    </div>
                </div>
            </div>

            <div className="botones-control">
                <button 
                    className={`boton-control ${pausado ? 'reanudar' : 'pausar'}`}
                    onClick={manejarPausaReanudar}
                >
                    {pausado ? '▶ Reanudar' : '⏸ Pausar'}
                </button>
                
                <button 
                    className="boton-control reiniciar"
                    onClick={manejarReiniciar}
                >
                    ← Reiniciar
                </button>
            </div>

            {miniTableroSolucion && (
                <div className="mini-tablero-section">
                    <h4>Solución Final</h4>
                    <div className="mini-tablero-container">
                        {miniTableroSolucion}
                    </div>
                </div>
            )}
        </div>
    );
}

export default ControlVelocidad;
