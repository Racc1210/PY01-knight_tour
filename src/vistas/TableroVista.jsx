import React from 'react';
import CasillaVista from './CasillaVista.jsx';
import { procesarDatosTablero, obtenerDatosCasilla } from '../controladores/controladorTablero.js';
import '../estilos/tablero.css';

function TableroVista({ 
    tamano = 4,
    posicionCaballo = null,
    casillasVisitadas = new Map(),
    casillasBacktracking = new Set(),
    numerosBacktracking = new Map(),
    posiblesMovimientos = new Set(),
    onCasillaClick = null,
    bloquearSeleccion = false // NUEVO PROP
}) {
    
    const datosProcesados = procesarDatosTablero(
        tamano,
        posicionCaballo,
        casillasVisitadas,
        casillasBacktracking,
        numerosBacktracking,
        posiblesMovimientos
    );

    const crearTablero = () => {
        const tablero = [];
        for (let fila = 0; fila < tamano; fila++) {
            for (let columna = 0; columna < tamano; columna++) {
                tablero.push({ fila, columna });
            }
        }
        return tablero;
    };

    const casillas = crearTablero();

    return (
        <div className="tablero-container">
            <div 
                className="tablero-grid"
                style={{ 
                    gridTemplateColumns: `repeat(${tamano}, 1fr)`,
                    gridTemplateRows: `repeat(${tamano}, 1fr)`
                }}
            >
                {casillas.map(({ fila, columna }) => {
                    const datosCasilla = obtenerDatosCasilla(datosProcesados, fila, columna);
                    return (
                        <CasillaVista
                            key={`${fila}-${columna}`}
                            fila={fila}
                            columna={columna}
                            esCasillaClara={(fila + columna) % 2 === 0}
                            numeroMovimiento={datosCasilla.numeroMovimiento}
                            esVisitada={datosCasilla.esVisitada}
                            esBacktracking={datosCasilla.esBacktracking}
                            esPosibleMovimiento={datosCasilla.esPosibleMovimiento}
                            tieneCaballo={datosCasilla.tieneCaballo}
                            onCasillaClick={bloquearSeleccion ? null : onCasillaClick}
                        />
                    );
                })}
            </div>
        </div>
    );
}

export default TableroVista;