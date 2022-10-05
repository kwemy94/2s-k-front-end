
function Token(token){

    const isValid = (token) =>{
        const payload = payload(token)

        if (payload) {
            return payload.iss = 'http://localhost:8000/api/auth/login' || 'http://localhost:8000/api/auth/login' ? true : false;
        }
        return false;
    }

    const payload = (token)=> {
        const payload = token.splid('.')[1];
        return decode(payload);
    }

    const decode = (payload) =>{
        return JSON.parse(atob(payload));
    }
}

export default Token;