import React from 'react';
import EstadisticasVista from './EstadisticasVista.jsx';
import TableroVista from './TableroVista.jsx';
import Controles from './Controles.jsx';
import ControlVelocidad from './ControlVelocidad.jsx';
import MiniTablero from './MiniTablero.jsx';
import { useEstadoTablero } from '../controladores/useEstadoTablero.js';
import { useEstadisticas } from '../controladores/useEstadisticas.js';
import { useAnimacionBacktracking } from '../controladores/useAnimacionBacktracking.js';

/**
 * Componente principal de la aplicación.
 * Usa custom hooks para gestionar estado de forma modular.
 */
function App() {
    const TAMANO_INICIAL = 5;
    const VELOCIDAD_INICIAL = 1; // movimientos por segundo


    const tablero = useEstadoTablero(TAMANO_INICIAL);
    const estadisticas = useEstadisticas();
    const animacion = useAnimacionBacktracking(tablero, estadisticas, VELOCIDAD_INICIAL);
    
    const manejarIniciar = (config) => {
        const { tamano, recorridoCerrado, filaInicial, columnaInicial } = config;
        animacion.iniciar(tamano, recorridoCerrado, filaInicial, columnaInicial);
    };

    const manejarCambioTamano = (nuevoTamano) => {
        if (!animacion.animacionActiva) {
            tablero.cambiarTamano(nuevoTamano);
        }
    };

    const manejarSeleccionCasilla = (fila, columna) => {
        console.log('📍 Seleccionando casilla:', { fila, columna, animacionActiva: animacion.animacionActiva });
        if (!animacion.animacionActiva) {
            tablero.seleccionarPosicion(fila, columna);
        }
    };

    const manejarCambioInput = (posicion) => {
        if (!animacion.animacionActiva) {
            tablero.seleccionarPosicion(posicion.fila, posicion.columna);
        }
    };

    

    return (
        <div className="app-container">
            <div className="layout-principal">
                {/* Panel izquierdo: Estadísticas */}
                <div className="panel-izquierdo">
                    <EstadisticasVista estadisticas={estadisticas.estadisticas} />
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
                        onCasillaClick={manejarSeleccionCasilla}
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
                                !animacion.sinSolucion ? (
                                    <MiniTablero 
                                        tamano={tablero.solucionFinal.tamano}
                                        solucion={tablero.solucionFinal.solucion}
                                    />
                                ) : (
                                    <div style={{ 
                                        color: '#f56565', 
                                        textAlign: 'center', 
                                        padding: '20px',
                                        fontSize: '14px'
                                    }}>
                                        No se encontró solución<br/>
                                        Mostrando proceso de búsqueda
                                    </div>
                                )
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
                    onIniciar={manejarIniciar} 
                    onDetener={animacion.detener}
                    animacionActiva={animacion.animacionActiva}
                    onCambioTamano={manejarCambioTamano}
                    posicionSeleccionada={tablero.posicionSeleccionada}
                    onCambioInput={manejarCambioInput}
                />
            </div>
        </div>
    );
}

export default App;
