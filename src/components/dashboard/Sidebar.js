import { Link } from "react-router-dom";


const Sidebar = () => {
    return (
        <ul className="navbar-nav sidebar sidebar-light accordion" id="accordionSidebar">
            <a className="sidebar-brand d-flex align-items-center justify-content-center" href="index.html">
                <div className="sidebar-brand-icon">
                    <img src="template/img/logo/2S kollect.png" alt="" style={{borderRadius: '10px'}} />
                </div>
                <div className="sidebar-brand-text mx-3">2S Kollect</div>
            </a>
            <hr className="sidebar-divider my-0" />
            <li className="nav-item active">
                <Link className="nav-link" to="/">
                    <i className="fas fa-fw fa-tachometer-alt"></i>
                    <span>Dashboard</span></Link>
            </li>
            <hr className="sidebar-divider" />

            <li className="nav-item">
                <Link className="nav-link collapsed" to="#" data-toggle="collapse" data-target="#collapseBootstrap"
                    aria-expanded="true" aria-controls="collapseBootstrap">
                    <i className="far fa-fw fa-window-maximize"></i>
                    <span>Opérations</span>
                </Link>
                <div id="collapseBootstrap" className="collapse" aria-labelledby="headingBootstrap" data-parent="#accordionSidebar">
                    <div className="bg-white py-2 collapse-inner rounded">
                        <Link className="collapse-item" to="#buttons.html">Retrait</Link>
                        <Link className="collapse-item" to="#alerts.html">Versement</Link>
                    </div>
                </div>
            </li>
            <li className="nav-item">
                <Link className="nav-link" to="/client">
                    <i className="fab fa-fw fa-wpforms"></i>
                    <span>Clients</span>
                </Link>
            </li>
            <li className="nav-item">
                <Link className="nav-link" to="/collector">
                    <i className="fab fa-fw fa-wpforms"></i>
                    <span>Collecteurs</span>
                </Link>
            </li>
            <li className="nav-item">
                <Link className="nav-link" to="/sector">
                    <i className="fab fa-fw fa-wpforms"></i>
                    <span>Secteurs</span>
                </Link>
            </li>
            <li className="nav-item">
                <Link className="nav-link" to="#forms.html">
                    <i className="fab fa-fw fa-wpforms"></i>
                    <span>Statistics</span>
                </Link>
            </li>
            <hr className="sidebar-divider" />

        </ul>
    );
}

export default Sidebar;