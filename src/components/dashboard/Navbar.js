import React from "react";
import Logout from "../auth/Logout";
import axios from 'axios';
import { Link } from "react-router-dom";


const Navbar = () => {



    const deconnecter = (e) => {
        // e.preventDefault();

        axios.post('http://localhost:8000/api/auth/logout', '',
            {
                headers: {
                    'Authorization': `Bearer ${localStorage.getItem('token')}`
                }
            }).then(res => {
                console.log(res);
            }).catch(err => {
                console.log('fgg ' + err);
            })
    }




    return (
        <nav className="navbar navbar-expand navbar-light bg-navbar topbar mb-4 static-top">
            <button id="sidebarToggleTop" className="btn btn-link rounded-circle mr-3">
                <i className="fa fa-bars"></i>
            </button>
            <ul className="navbar-nav ml-auto">

                <li className="nav-item dropdown no-arrow mx-1">
                    <Link className="nav-link dropdown-toggle" to="#" id="messagesDropdown" role="button" data-toggle="dropdown"
                        aria-haspopup="true" aria-expanded="false">
                        <i className="fas fa-envelope fa-fw"></i>
                        <span className="badge badge-warning badge-counter">2</span>
                    </Link>
                    <div className="dropdown-list dropdown-menu dropdown-menu-right shadow animated--grow-in"
                        aria-labelledby="messagesDropdown">
                        <h6 className="dropdown-header">
                            Message Center
                        </h6>
                        <Link className="dropdown-item d-flex align-items-center" to="#">
                            <div className="dropdown-list-image mr-3">
                                <img className="rounded-circle" src="template/img/man.png" style={{ maxWidth: "60px" }} alt="" />
                                <div className="status-indicator bg-success"></div>
                            </div>
                            <div className="font-weight-bold">
                                <div className="text-truncate">Hi there! I am wondering if you can help me with a problem I've been
                                    having.</div>
                                <div className="small text-gray-500">Udin Cilok · 58m</div>
                            </div>
                        </Link>
                        <Link className="dropdown-item d-flex align-items-center" to="#">
                            <div className="dropdown-list-image mr-3">
                                <img className="rounded-circle" src="template/img/girl.png" style={{ maxWidth: "60px" }} alt="" />
                                <div className="status-indicator bg-default"></div>
                            </div>
                            <div>
                                <div className="text-truncate">Am I a good boy? The reason I ask is because someone told me that people
                                    say this to all dogs, even if they aren't good...</div>
                                <div className="small text-gray-500">Jaenab · 2w</div>
                            </div>
                        </Link>
                        <Link className="dropdown-item text-center small text-gray-500" to="#">Read More Messages</Link>
                    </div>
                </li>

                <div className="topbar-divider d-none d-sm-block"></div>
                <li className="nav-item dropdown no-arrow">
                    <Link className="nav-link dropdown-toggle" to="#" id="userDropdown" role="button" data-toggle="dropdown"
                        aria-haspopup="true" aria-expanded="false">
                        <img className="img-profile rounded-circle" alt="" src="template/img/boy.png" style={{ maxWidth: "60px" }} />
                        <span className="ml-2 d-none d-lg-inline text-white small">Maman Ketoprak</span>
                    </Link>
                    <div className="dropdown-menu dropdown-menu-right shadow animated--grow-in" aria-labelledby="userDropdown">
                        <a className="dropdown-item" href="/">
                            <i className="fas fa-user fa-sm fa-fw mr-2 text-gray-400"></i>
                            Profile
                        </a>
                        <Link className="dropdown-item" to="/">
                            <i className="fas fa-cogs fa-sm fa-fw mr-2 text-gray-400"></i>
                            Settings
                        </Link>
                        <div className="dropdown-divider"></div>
                        <a className="dropdown-item" href="login.html">
                            <i className="fas fa-sign-out-alt fa-sm fa-fw mr-2 text-gray-400"></i>
                            Logout
                        </a>
                    </div>
                </li>
            </ul>
        </nav>
    );
}

export default Navbar