import React, { useState } from 'react';
import EstadisticasVista from './EstadisticasVista.jsx';
import TableroVista from './TableroVista.jsx';
import Controles from './Controles.jsx';
import ControlVelocidad from './ControlVelocidad.jsx';

function App() {
    const [algoritmoEjecutandose, setAlgoritmoEjecutandose] = useState(false);
    const [estadisticas, setEstadisticas] = useState({
        movimientos: 0,
        retrocesos: 0,
        progreso: 0
    });

    return (
        <div className="app-container">
            <div className="layout-principal">
                <div className="panel-izquierdo">
                    <EstadisticasVista estadisticas={estadisticas} />
                </div>
                
                <div className="panel-central">
                    <TableroVista />
                </div>
                
                {algoritmoEjecutandose && (
                    <div className="panel-derecho">
                        <ControlVelocidad 
                            onPausar={() => setAlgoritmoEjecutandose(false)}
                            onReiniciar={() => setAlgoritmoEjecutandose(false)}
                        />
                    </div>
                )}
            </div>
            
            <div className="panel-inferior">
                <Controles 
                    onIniciar={() => setAlgoritmoEjecutandose(true)}
                />
            </div>
        </div>
    );
}

export default App;