import React from 'react';
import CasillaVista from './CasillaVista.jsx';
import '../estilos/tablero.css';

function TableroVista({ tamano = 4 }) {
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
                {casillas.map(({ fila, columna }) => (
                    <CasillaVista
                        key={`${fila}-${columna}`}
                        fila={fila}
                        columna={columna}
                        esCasillaClara={(fila + columna) % 2 === 0}
                    />
                ))}
            </div>
        </div>
    );
}

export default TableroVista;