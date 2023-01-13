import { Routes, Route, useNavigate, Navigate } from 'react-router-dom'
import Home from '../components/dashboard/Home';
import Logout from '../components/auth/Logout';
import 'bootstrap/dist/css/bootstrap.min.css';
import Login2 from '../components/auth/Login2';
import { createContext, useState } from 'react';
import { meService } from '../service/http/login';
import Sector from '../components/dashboard/secteur/SectorIndex';
import CollectorIndex from '../components/dashboard/collector/CollectorIndex';
import ClientIndex from '../components/dashboard/client/ClientIndex';
import ClientShow from '../components/dashboard/client/ClientShow';
import Profile from '../components/dashboard/profile/Profile';
import PageNotFound from '../components/PageNotFound';
import BilanCollect from '../components/dashboard/statistic/BilanCollect';
import BilanSector from '../components/dashboard/statistic/BilanSector';
import { toast } from 'react-toastify';


export const LoginContext = createContext();

const AppRouter = () => {

    const [connexion, setConnexion] = useState();

    const connectUser = () => {
        if (localStorage.getItem('access_token')) {
            meService().then(res => {
                if (res.data.status == 200) {
                    setConnexion(true);
                    console.log('bon user connect');
                }
            }).catch(err => {
                console.log(err.response);
                if (err.response.status == 500) {
                    localStorage.clear();
                    setConnexion(false);
                    toast.warning(err.response.data.message)
                }
                // setConnexion(false);
            })
        }
    }

    useState(() => {
        connectUser();
    }, [connexion])


    return (
        <LoginContext.Provider value={[connexion, setConnexion]} >
            <div >
                {/* <Navbar /> */}

                <Routes>

                    {/* <Route path="/" element={<Login />} /> */}
                    <Route exact path="/" element={!localStorage.getItem('access_token') ? <Navigate to='/sign-in' /> : <Home />} />
                    <Route path="/log-out" element={!localStorage.getItem('access_token') ? <Navigate to='/sign-in' /> :<Logout />} />

                    {/* <Route path="/sign-in" element={<Login2 />} /> */}
                    <Route path='/sign-in' element={localStorage.getItem('access_token') ? <Navigate to='/' /> : <Login2 />} />

                    <Route path="/sector" element={!localStorage.getItem('access_token') ? <Navigate to='/sign-in' /> : <Sector />} />
                    <Route path="/collector" element={!localStorage.getItem('access_token') ? <Navigate to='/sign-in' /> : <CollectorIndex />} />
                    <Route path="/client" element={!localStorage.getItem('access_token') ? <Navigate to='/sign-in' /> : <ClientIndex />} />
                    <Route path="/client/:id" element={!localStorage.getItem('access_token') ? <Navigate to='/sign-in' /> : <ClientShow />} />
                    <Route path="/profile" element={!localStorage.getItem('access_token') ? <Navigate to='/sign-in' /> : <Profile />} />
                    <Route path="*" element={<PageNotFound />} />
                    <Route path="/bilan-collect/:id" element={!localStorage.getItem('access_token') ? <Navigate to='/sign-in' /> : <BilanCollect />} />
                    <Route path="/bilan-collect" element={!localStorage.getItem('access_token') ? <Navigate to='/sign-in' /> : <BilanCollect />} />
                    <Route path="/bilan-sector" element={!localStorage.getItem('access_token') ? <Navigate to='/sign-in' /> : <BilanSector />} />
                </Routes>
            </div>
        </LoginContext.Provider>
    );
}

export default AppRouter;
