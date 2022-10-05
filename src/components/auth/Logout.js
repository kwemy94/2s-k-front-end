import React from "react";
import axios from 'axios'
import {useNavigate} from 'react-router-dom'

// class Logout extends React.Component {

//     constructor(props) {
//         super(props)
//         this.state = {

//         }
//     }
    

//     deconnecter = (e) =>{
//         e.preventDefault();
        
//         if(!localStorage.getItem('token')){
//             return (<Login/>)
//         } else{
//             return (<Home/>)
//         }
//         // axios.post('http://localhost:8000/api/logout', '',
//         // {
//         //     headers: {
//         //         'Authorization': `Bearer ${localStorage.getItem('token')}`
//         //     }
//         // }).then(res =>{
//         //     console.log(res);
//         // }).catch(err =>{
//         //     console.log(err);
//         // })
//     }

//     render(){
//         if (!localStorage.getItem('token')) {
//             return (
//                 <Login/>
//                 );
//         }
        
//     }



// }

// export default Logout;

export default function Logout(props) {

    const navigate = useNavigate();

    // function signOut(){
        
        const url = 'http://localhost:8000/api/auth/logout';

        if (localStorage.getItem('token')) {
            axios.post(url, '', {
                headers: {
                    'Authorization': 'Bearer '+localStorage.getItem('token')
                }
            }).then(res =>{
                console.log(res.data);
                console.log(res);
                localStorage.removeItem('token')
                localStorage.removeItem('user')
                console.log('Vous êtes déconnecté !');
                navigate('/')
                 
    
            }).catch(error => {
                console.log(error);
            }); 
        }
        
        
    // }

    return (
        <>
        {/* <Login /> */}
        {/* {signOut} */}
        </>
    )
        
}