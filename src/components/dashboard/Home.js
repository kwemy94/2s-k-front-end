import React from "react";
import Footer from "./Footer";
import Navbar from "./Navbar";
import Sidebar from "./Sidebar";

function Home() {


    return (
        <>
            <div id="wrapper">

                
                <Sidebar/>

                <div id="content-wrapper" className="d-flex flex-column">
                    <div id="content">

                        
                        <Navbar/>

                        <div className="container-fluid" id="container-wrapper">
                            

                            <div className="row mb-3">

                                <div className="col-xl-3 col-md-6 mb-4">
                                    <div className="card h-100">
                                        <div className="card-body">
                                            <div className="row align-items-center">
                                                <div className="col mr-2">
                                                    <div className="text-xs font-weight-bold text-uppercase mb-1">Earnings (Monthly)</div>
                                                    <div className="h5 mb-0 font-weight-bold text-gray-800">$40,000</div>
                                                    <div className="mt-2 mb-0 text-muted text-xs">
                                                        <span className="text-success mr-2"><i className="fa fa-arrow-up"></i> 3.48%</span>
                                                        <span>Since last month</span>
                                                    </div>
                                                </div>
                                                <div className="col-auto">
                                                    <i className="fas fa-calendar fa-2x text-primary"></i>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>

                                <div className="col-xl-3 col-md-6 mb-4">
                                    <div className="card h-100">
                                        <div className="card-body">
                                            <div className="row no-gutters align-items-center">
                                                <div className="col mr-2">
                                                    <div className="text-xs font-weight-bold text-uppercase mb-1">Sales</div>
                                                    <div className="h5 mb-0 font-weight-bold text-gray-800">650</div>
                                                    <div className="mt-2 mb-0 text-muted text-xs">
                                                        <span className="text-success mr-2"><i className="fas fa-arrow-up"></i> 12%</span>
                                                        <span>Since last years</span>
                                                    </div>
                                                </div>
                                                <div className="col-auto">
                                                    <i className="fas fa-shopping-cart fa-2x text-success"></i>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>

                                <div className="col-xl-3 col-md-6 mb-4">
                                    <div className="card h-100">
                                        <div className="card-body">
                                            <div className="row no-gutters align-items-center">
                                                <div className="col mr-2">
                                                    <div className="text-xs font-weight-bold text-uppercase mb-1">New User</div>
                                                    <div className="h5 mb-0 mr-3 font-weight-bold text-gray-800">366</div>
                                                    <div className="mt-2 mb-0 text-muted text-xs">
                                                        <span className="text-success mr-2"><i className="fas fa-arrow-up"></i> 20.4%</span>
                                                        <span>Since last month</span>
                                                    </div>
                                                </div>
                                                <div className="col-auto">
                                                    <i className="fas fa-users fa-2x text-info"></i>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>

                                <div className="col-xl-3 col-md-6 mb-4">
                                    <div className="card h-100">
                                        <div className="card-body">
                                            <div className="row no-gutters align-items-center">
                                                <div className="col mr-2">
                                                    <div className="text-xs font-weight-bold text-uppercase mb-1">Pending Requests</div>
                                                    <div className="h5 mb-0 font-weight-bold text-gray-800">18</div>
                                                    <div className="mt-2 mb-0 text-muted text-xs">
                                                        <span className="text-danger mr-2"><i className="fas fa-arrow-down"></i> 1.10%</span>
                                                        <span>Since yesterday</span>
                                                    </div>
                                                </div>
                                                <div className="col-auto">
                                                    <i className="fas fa-comments fa-2x text-warning"></i>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>

                            </div>

                            

                        </div>
                    </div>
                    <Footer/>
                </div>
            </div>
        </>
    )
}

export default Home;