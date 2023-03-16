
import React from 'react'
import Footer from './dashboard/Footer'
import Navbar from './dashboard/Navbar'
import Sidebar from './dashboard/Sidebar'

const PageNotFound = () => {
    return (
        <div id='wrapper'>
            {/* <Sidebar /> */}
            <div id="content-wrapper" className="d-flex flex-column">
                <div id="content">
                    {/* <Navbar /> */}
                    <div className="container-fluid" id="container-wrapper">
                        <div className="text-center">
                            <img src="template/img/error.svg" style={{ maxHeight: "100px" }} alt='' className="mb-3" />
                            <h3 className="text-gray-800 font-weight-bold">Oopss!</h3>
                            <p className="lead text-gray-800 mx-auto">404 Page Not Found</p>
                            <a href="/" className='btn btn-warning'>&larr; Retour</a>
                        </div>

                    </div>
                </div>
                <Footer />
            </div>

        </div>
    )
}

export default PageNotFound
