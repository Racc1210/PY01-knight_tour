import React from 'react';

function CasillaVista({ 
    fila, 
    columna, 
    esCasillaClara, 
    numeroMovimiento = null,
    esVisitada = false,
    esBacktracking = false,
    esPosibleMovimiento = false,
    tieneCaballo = false,
    onCasillaClick = null
}) {
    const obtenerClasesCasilla = () => {
        let clases = `casilla ${esCasillaClara ? 'casilla-clara' : 'casilla-oscura'}`;
        
        if (esVisitada) {
            clases += ' casilla-visitada';
        }
        if (esBacktracking) {
            clases += ' casilla-backtracking';
        }
        if (esPosibleMovimiento) {
            clases += ' casilla-posible-movimiento';
        }
        if (tieneCaballo) {
            clases += ' casilla-con-caballo';
        }
        if (onCasillaClick) {
            clases += ' casilla-clickeable';
        }
        
        return clases;
    };

    const manejarClick = () => {
        if (onCasillaClick) {
            onCasillaClick(fila, columna);
        }
    };

    return (
        <div 
            className={obtenerClasesCasilla()}
            onClick={manejarClick}
            data-fila={fila}
            data-columna={columna}
        >
            {numeroMovimiento !== null && (
                <span className="numero-movimiento">
                    {numeroMovimiento}
                </span>
            )}
            
            {tieneCaballo && (
                <div className="caballo-icon">
                    <img src={process.env.PUBLIC_URL + '/caballo.png'} alt="Caballo" className="caballo-imagen" />
                </div>
            )}
            
            {esPosibleMovimiento && !tieneCaballo && (
                <div className="indicador-movimiento-posible">
                    ○
                </div>
            )}
        </div>
    );
}

export default CasillaVista;