import React, { useContext, useState } from "react";
import axios from 'axios'
import { useNavigate } from 'react-router-dom'
import { LoginContext } from "../../router/AppRouter";
import { toast } from "react-toastify";
import { logOutService } from "../../service/http/login";
import Loader from "../../service/Loader";


export default function Logout(props) {

    const navigate = useNavigate();
    const [connexion, setConnexion] = useContext(LoginContext);
    const [loading, setLoading] = useState(true);

    if (localStorage.getItem('access_token')) {

        logOutService().then(res => {
            console.log(res.data);
            localStorage.clear();
            toast.success('Vous êtes déconnecté !');
            navigate('/sign-in')
            setConnexion(false);
            setLoading(false);


        }).catch(error => {
            console.log(error);
            setLoading(false);
        });
    }

    return (
        <>
            <Loader loading={loading} />
        </>
    )

}