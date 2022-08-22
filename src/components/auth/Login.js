import * as Yup from 'yup'
import '../auth/css/form.css'
import {yupResolver} from '@hookform/resolvers/yup'
import {useForm} from 'react-hook-form'
import axios from 'axios'
import { useState } from 'react'

const validationSchema = Yup.object().shape({
    email: Yup.string()
        .email('Email invalide')
        .required('Email requis'),
    password: Yup.string()
        .required('Mot de passe requis'),
});

// const [user, setUser] = useState({
//     email: '',
//     password: ''
// });

const onFormSubmit = (values) =>{
    console.log( values);
   
    axios.post('http://localhost:8000/api/auth/login', 
    values, 
    // {
    //     headers:{
    //         Authorization: 'Bearer '+token
    //     }
    // }
    )
        .then(res => {
            console.log(res.data);
            console.log('ici');
        })
        .catch(err => {
            console.log('erreur');
            console.log(err.response.data);
        })

}

const onError = (errors) =>{
    console.log(errors);
}

const Login = () =>{

    const [user, setUser] = useState({
        email: '',
        password: ''
    });

    const {register, handleSubmit, formState: {errors}} = useForm({
        mode: 'onblur',
        resolver: yupResolver(validationSchema)
    })

    return (
        <div className='register'>
            <form onSubmit={handleSubmit(onFormSubmit, onError)}>
                <h1>Login</h1>
                <div className="formInput">
                    <label>Email</label>
                    <input type='text'
                        name="email"
                        {...register('email')}
                        className={errors.email ? 'input-error' : ''} />
                    <span className="error-message">{errors.email?.message}</span>
                </div>

                <div className="formInput">
                    <label>Password</label>
                    <input type='password'
                        name="password"
                        {...register('password')}
                        className={errors.password ? 'input-error' : ''} />
                    <span className="error-message">{errors.password?.message}</span>
                </div>
                <button type="submit" >Login</button>
            </form>
        </div>
        
    )
}

export default Login;