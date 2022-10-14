import React, { useEffect, useState } from "react";
import { useForm } from 'react-hook-form'
import { yupResolver } from '@hookform/resolvers/yup';
import * as Yup from 'yup'
import { loginService } from "../../service/http/login";
import Loader from "../../service/Loader";
import { toast } from "react-toastify";

const validationSchema = Yup.object().shape({
    email: Yup.string()
        .email('Email invalide')
        .required('Email requis 2'),
    password: Yup.string()
        .required('Mot de passe requis 2'),
});

function Login2(props) {

    const { register, handleSubmit, watch, formState: { errors } } = useForm({
        resolver: yupResolver(validationSchema)
    });

    const [loading, setLoading] = useState(false);


    function onFormSubmit() {

        console.log(watch());
        // console.log(values);
        setLoading(true)


        loginService(watch()).then(res => {
            console.log(res.data);
            localStorage.setItem('access_token', res.data.access_token)
            localStorage.setItem('user', JSON.stringify(res.data.user))
            props.setConnexion(true);
            setLoading(false);

        }).catch(err => {
            console.log(err.response);
            toast.error(err.response.data.error)
            setLoading(false);
        })

        

    }


    return (
        <>
            <Loader loading={loading} />
            <div className="container-login">
                <div className="row justify-content-center">
                    <div className="col-xl-6 col-lg-12 col-md-9">
                        <div className="card shadow-sm my-5">
                            <div className="card-body p-0">
                                <div className="row">
                                    <div className="col-lg-12">
                                        <div className="login-form">
                                            <div className="text-center">
                                                <h1 className="h4 text-gray-900 mb-4">Connexion</h1>
                                            </div>
                                            <form className="user" onSubmit={handleSubmit(() => onFormSubmit())} method='POST'>
                                                <div className="form-group">
                                                    <input className="form-control" aria-describedby="emailHelp"
                                                        {...register('email', { required: 'Email obligatoire' })}
                                                        placeholder="Enter Email Address"
                                                        type="email"
                                                    />
                                                    <p style={{ color: 'red' }}>{errors.email?.message} </p>

                                                </div>
                                                <div className="form-group">
                                                    <input className="form-control" id="exampleInputPassword"
                                                        {...register('password', { required: 'Mot de passe requis' })}
                                                        placeholder="Mot de passe"
                                                        type="password"
                                                    />
                                                    <p style={{ color: 'red' }}>{errors.password?.message} </p>
                                                </div>
                                                <div className="form-group">
                                                    <div className="custom-control custom-checkbox small" style={{ lineHeight: 1.5 + 'rem' }}>
                                                        <input type="checkbox" className="custom-control-input" id="customCheck" />
                                                        <label className="custom-control-label" htmlFor="customCheck">Remember
                                                            Me</label>
                                                    </div>
                                                </div>
                                                <div className="form-group">
                                                    <button className="btn btn-primary btn-block">Login</button>
                                                </div>
                                            </form>
                                            <hr />
                                            <div className="text-center">
                                                <a className="font-weight-bold small" href="register.html">Mot de passe oublié !</a>
                                            </div>
                                            <div className="text-center">
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>


    )

}

export default Login2;