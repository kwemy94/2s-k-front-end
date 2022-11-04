import React from 'react'
import Footer from './../Footer'
import Navbar from './../Navbar'
import Sidebar from './../Sidebar'

const BilanCollect = () => {
    return (
        <div id='wrapper'>
            <Sidebar />
            <div id="content-wrapper" className="d-flex flex-column">
                <div id="content">
                    <Navbar />
                    <div className="container-fluid" id="container-wrapper">
                        En cours ....

                    </div>
                </div>
                <Footer />
            </div>

        </div>
    )
}

export default BilanCollect
