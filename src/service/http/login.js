import axios from "axios";


const baseUrl = 'http://localhost:8000/api';
const baseUrlConfig = 'http://localhost:8000/api/auth';

const headers ={ 
    headers: {
        "Accept": 'application/json', 
        "Content-Type": 'application/json', 
        'Authorization': `Bearer ${localStorage.getItem('access_token')}`,
    }
    
};
const meHeaders ={ 
    headers: { 
        Authorization: `Bearer ${localStorage.getItem('access_token')}`,
        // 'content_type' : 'application/x-www-form-urlencoded',
    }
    
};


export const loginService = (param=null) => {
    return axios.post(`${baseUrlConfig}/login`, param, headers);
}

export const meService = (param=null) => {
    return axios.post(`http://localhost:8000/api/auth/me`, param, meHeaders);
}

