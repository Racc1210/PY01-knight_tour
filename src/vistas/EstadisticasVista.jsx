import React from 'react';
import '../estilos/estadisticas.css';

function EstadisticasVista({ estadisticas }) {
    const { tiempoEjecucion, movimientos, retrocesos, progreso } = estadisticas;

    return (
        <div className="estadisticas-container">
            <h3>Estadísticas</h3>
            
            <div className="estadistica-item">
                <label>Tiempo de ejecución</label>
                <span className="estadistica-valor">{tiempoEjecucion || '0.0s'}</span>
            </div>
            
            <div className="estadistica-item">
                <label>Movimientos</label>
                <span className="estadistica-valor">{movimientos}</span>
            </div>
            
            <div className="estadistica-item">
                <label>Retrocesos</label>
                <span className="estadistica-valor">{retrocesos}</span>
            </div>
            
            <div className="estadistica-item">
                <label>Progreso</label>
                <div className="progreso-container">
                    <div className="barra-progreso">
                        <div 
                            className="progreso-fill" 
                            style={{ width: `${progreso}%` }}
                        ></div>
                    </div>
                    <span className="progreso-texto">{progreso}%</span>
                </div>
            </div>
        </div>
    );
}

export default EstadisticasVista;