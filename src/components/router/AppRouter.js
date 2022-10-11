import { Routes, Route } from 'react-router-dom'
import Home from '../dashboard/Home';
import Logout from '../auth/Logout';
import 'bootstrap/dist/css/bootstrap.min.css';
import Navbar from '../dashboard/Navbar';
import Login2 from '../auth/Login2';
import { useEffect, useState } from 'react';
import { meService } from '../../service/http/login';
import Sector from '../dashboard/secteur/SectorIndex';
import CollectorIndex from '../dashboard/collector/CollectorIndex';
import ClientIndex from '../dashboard/client/ClientIndex';
import { toast } from 'react-toastify';
import ClientShow from '../dashboard/client/ClientShow';

const AppRouter = () => {

    const [connexion, setConnexion] = useState(false);

    useEffect(()=> {
        if (localStorage.getItem('access_token')) {
            meService().then(res =>{
                console.log(res.data);
                setConnexion(true);
                localStorage.setItem('user', JSON.stringify(res.data));
                toast.info(`Hallo ${res.data.name}`)
            }).catch(err =>{
                console.log(err.response);
                if (err.response.data.message === 'Token has expired') {
                    toast.error('Session expirée. Connectez-vous!');
                }
                
                // localStorage.clear();
            })
        }
    }, [])

    // useEffect(() =>{
        // if (!connexion) {
        //     return (
        //         <Routes>
        //             <Route path="/" element={<Login2 setConnexion={setConnexion} />} />
        //         </Routes>
        //     );
    
        // } else {
            return (
                <div >
                    {/* <Navbar /> */}
    
                    <Routes>
    
                        {/* <Route path="/" element={<Login />} /> */}
                        <Route exact path="/" element={<Home />} />
                        <Route path="/log-out" element={<Logout />} />
                        <Route path="/sign-in" element={<Login2 />} />
                        <Route path="/sector" element={<Sector />} />
                        <Route path="/collector" element={<CollectorIndex />} />
                        <Route path="/client" element={<ClientIndex />} />
                        <Route path="/client/:id" element={<ClientShow />} />
                    </Routes>
                </div>
            );
        // }
    // }, [connexion])

    

}

export default AppRouter;
