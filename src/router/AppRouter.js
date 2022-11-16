import { Routes, Route, useNavigate, Navigate } from 'react-router-dom'
import Home from '../components/dashboard/Home';
import Logout from '../components/auth/Logout';
import 'bootstrap/dist/css/bootstrap.min.css';
import Navbar from '../components/dashboard/Navbar';
import Login2 from '../components/auth/Login2';
import { useEffect, useState } from 'react';
import { meService } from '../service/http/login';
import Sector from '../components/dashboard/secteur/SectorIndex';
import CollectorIndex from '../components/dashboard/collector/CollectorIndex';
import ClientIndex from '../components/dashboard/client/ClientIndex';
import { toast } from 'react-toastify';
import ClientShow from '../components/dashboard/client/ClientShow';
import Profile from '../components/dashboard/profile/Profile';
import PageNotFound from '../components/PageNotFound';
import BilanCollect from '../components/dashboard/statistic/BilanCollect';
import BilanSector from '../components/dashboard/statistic/BilanSector';

const AppRouter = () => {

    const [connexion, setConnexion] = useState(false);

    useEffect(()=> {

        setConnexion(localStorage.getItem('access_token')? true : false)
        // if (localStorage.getItem('access_token')) {
        //     meService().then(res =>{
        //         console.log(res.data);

        //         if (res.data.access_token === localStorage.getItem('access_token')) {
        //             setConnexion(true);
        //             // localStorage.setItem('user', JSON.stringify(res.data));
        //             // toast.info(`Hallo ${res.data.name}`);
        //         }
        //         // setConnexion(true);
        //         // localStorage.setItem('user', JSON.stringify(res.data));
        //         // toast.info(`Hallo ${res.data.name}`)
        //     }).catch(err =>{
        //         console.log(err.response);
        //         if (err.response.data.message === 'Token has expired') {
        //             localStorage.clear();
        //         }
                
        //         // localStorage.clear();
        //     })
        // }
    }, [connexion])

    // useEffect(() =>{
        // if (!connexion) {
        //     return (
        //         <Routes>
        //             <Route path="/" element={<Login2 setConnexion={setConnexion} />} />
        //         </Routes>
        //     );
    
        // } else {

        if (!connexion) {
          return(
            <>
            <Login2 setConnexion={setConnexion}/>
            {/* <Navigate replace to='/sign-in' /> */}
            </>
          )  
            
        } else {
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
                        <Route path="/profile" element={<Profile />} />
                        <Route path="*" element={<PageNotFound />} />
                        <Route path="/bilan-collect/:id" element={<BilanCollect />} />
                        <Route path="/bilan-collect" element={<BilanCollect />} />
                        <Route path="/bilan-sector" element={<BilanSector />} />
                    </Routes>
                </div>
            ); 
        }
            // return (
            //     <div >
            //         {/* <Navbar /> */}
    
            //         <Routes>
    
            //             {/* <Route path="/" element={<Login />} /> */}
            //             <Route exact path="/" element={<Home />} />
            //             <Route path="/log-out" element={<Logout />} />
            //             {/* <Route path="/sign-in" element={<Login2 />} /> */}
            //             <Route path="/sector" element={<Sector />} />
            //             <Route path="/collector" element={<CollectorIndex />} />
            //             <Route path="/client" element={<ClientIndex />} />
            //             <Route path="/client/:id" element={<ClientShow />} />
            //         </Routes>
            //     </div>
            // );
        // }
    // }, [connexion])

    

}

export default AppRouter;
