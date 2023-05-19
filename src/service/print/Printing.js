import React from 'react'
import ReactToPrint from 'react-to-print'

/*
fonction d'impression
*/

const Printing = (props) => {
    // console.log(props.componentRef.current);

    return (
        <ReactToPrint
            trigger={() => <button className='btn btn-info btn-sm mb-2' title='Télécharger'><i className='fa fa-download'></i> </button>}
            content={() => props.componentRef.current}
            pageStyle="@page { size: 2.5in 4in }"
        />
    )
}

export default Printing