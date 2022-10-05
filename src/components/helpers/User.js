import AppStorage from './AppStorage';
import Token from './Token';

function User(){

    const responseAfterLogin = (res) =>{
        const access_token = res.data.access_token;
        // const username = res.data.username;
        const email = res.data.email;

        if (Token.isValid(access_token)) {
            AppStorage.store(access_token, email);
        }

        // return false

    }

    const hasToken = () =>{
        const storeToken = localStorage.getItem('token');

        if (storeToken) {
            return Token.isValid(storeToken) ? true : false;
        }
        return false;
    }

    const loggedIn = () => {
        return hasToken();
    }

    const email = () =>{
        if (loggedIn) {
            return localStorage.getItem('user');
        }
    }
}

export default User;