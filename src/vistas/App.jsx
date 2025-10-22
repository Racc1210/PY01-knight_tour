import React from 'react';
import EstadisticasVista from './EstadisticasVista.jsx';
import TableroVista from './TableroVista.jsx';
import Controles from './Controles.jsx';
import ControlVelocidad from './ControlVelocidad.jsx';
import MiniTablero from './MiniTablero.jsx';

/**
 * Componente principal de la aplicación.
 * Usa custom hooks para gestionar estado de forma modular.
 */
function App() {

    const TAMANO_INICIAL = 5;
    const VELOCIDAD_INICIAL = 1; 

    
    const tablero = null;
    const estadisticas = null;
    const animacion = null;

  


    return (
        <div className="app-container">
            <div className="layout-principal">
                {/* Panel izquierdo: Estadísticas */}
                <div className="panel-izquierdo">
                    <EstadisticasVista estadisticas="0" />
                </div>
                
                {/* Panel central: Tablero */}
                <div className="panel-central">
                    <TableroVista 
                        tamano={tablero.tamanoTablero}
                        posicionCaballo={tablero.posicionCaballo}
                        casillasVisitadas={tablero.casillasVisitadas}
                        casillasBacktracking={tablero.casillasBacktracking}
                        numerosBacktracking={tablero.numerosBacktracking}
                        posiblesMovimientos={tablero.posiblesMovimientos}
                        
                    />
                </div>
                
                {/* Panel derecho: Controles de velocidad o mensaje */}
                <div className="panel-derecho">
                    {animacion.animacionActiva ? (
                        <ControlVelocidad 
                            velocidadInicial={VELOCIDAD_INICIAL}
                            onPausar={animacion.pausar}
                            onReanudar={animacion.reanudar}
                            onReiniciar={animacion.reiniciar}
                            onCambioVelocidad={animacion.cambiarVelocidad}
                            miniTableroSolucion={
                                <MiniTablero 
                                    tamano={tablero.solucionFinal.tamano}
                                    solucion={tablero.solucionFinal.solucion}
                                />
                            }
                        />
                    ) : (
                        <div style={{ 
                            display: 'flex', 
                            justifyContent: 'center', 
                            alignItems: 'center',
                            height: '100%',
                            color: '#8b949e',
                            textAlign: 'center',
                            padding: '40px'
                        }}>
                            <div>
                                <p>Inicia un recorrido para ver los controles y la solución</p>
                            </div>
                        </div>
                    )}
                </div>
            </div>
            
            {/* Panel inferior: Controles principales */}
            <div className="panel-inferior">
                <Controles 
    
                />
            </div>
        </div>
    );
}

export default App;
