import React from 'react';
import CasillaVista from './CasillaVista.jsx';
import '../estilos/tablero.css';

function MiniTablero({ tamano, solucion }) {
    if (!solucion || solucion.size === 0) {
        return (
            <div className="mini-tablero-vacio">
                Esperando solución...
            </div>
        );
    }

    const renderCasilla = (fila, columna) => {
        const coordenada = `${fila},${columna}`;
        const numeroMovimiento = solucion.get(coordenada);
        
        return (
            <CasillaVista
                key={`${fila}-${columna}`}
                fila={fila}
                columna={columna}
                esVisitada={!!numeroMovimiento}
                esBacktracking={false}
                esPosibleMovimiento={false}
                tieneCaballo={false}
                numeroMovimiento={numeroMovimiento || null}
                onClick={() => {}}
            />
        );
    };

    const renderTablero = () => {
        const filas = [];
        for (let fila = 0; fila < tamano; fila++) {
            for (let columna = 0; columna < tamano; columna++) {
                filas.push(renderCasilla(fila, columna));
            }
        }
        return filas;
    };

    return (
        <div className="mini-tablero-container-wrapper">
            <div 
                className="tablero-grid mini-tablero-grid"
                style={{
                    gridTemplateColumns: `repeat(${tamano}, 1fr)`,
                    gridTemplateRows: `repeat(${tamano}, 1fr)`
                }}
            >
                {renderTablero()}
            </div>
        </div>
    );
}

export default MiniTablero;
