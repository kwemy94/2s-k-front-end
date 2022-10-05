

const Loader = (props) => {
    return (
        <div id="main-loading" className="text-center" 
        style={
            props.loading
            ? {display: "block"}
            : ({display: "none"} )
        }>
            <div className="col-8 text justify-content-center align-self-center">Patientez...</div>
            <div className="loading justify-content-center align-self-center"></div>
        </div>
    )
}

export default Loader;