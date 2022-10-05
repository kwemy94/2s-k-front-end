
function AppStorage(){
    let storeToken = (token) =>{
        localStorage.setItem('token', token);
    }

    let storeUser = (user) =>{
        localStorage.setItem('user', user);
    }

    let store = (token, user) => {
        storeToken(token);
        storeUser(user);
    }

    let clear = () =>{
        localStorage.removeItem('token');
        localStorage.removeItem('user');

    }

    let getToken = () =>{
        localStorage.getItem('token')
    }

    let getUser = () =>{
        localStorage.getItem('user')
    }
}

export default AppStorage;