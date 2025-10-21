import React from 'react';

function CasillaVista({ fila, columna, esCasillaClara, tieneNumero, numero }) {
    const clasesCasilla = `casilla ${esCasillaClara ? 'casilla-clara' : 'casilla-oscura'}`;

    return (
        <div className={clasesCasilla}>
            {tieneNumero && <span className="numero-movimiento">{numero}</span>}
        </div>
    );
}

export default CasillaVista;