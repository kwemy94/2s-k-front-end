import React from 'react'
import ReactToPrint from 'react-to-print'

/*
fonction d'impression
*/

const Printing = (props) => {


    return (
        <ReactToPrint
            trigger={() => <button>Imprimer</button>}
            content={() => props.componentRef.current}
        />
    )
}

export default Printing