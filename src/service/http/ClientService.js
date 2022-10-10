

import axios from "axios";


const baseUrl = 'http://localhost:8000/api/auth';

const headers ={ 
    headers: {
        "Accept": 'application/json', 
        "Content-Type": 'application/json', 
        'Authorization': `Bearer ${localStorage.getItem('access_token')}`,
    }
    
};


export const clientService = (param=null) => {
    return axios.post(`${baseUrl}/client`, param, headers);
}

export const clientStoreService = (param=null) => {
    return axios.post(`${baseUrl}/user-store`, param, headers);
}

export const clientDeleteService = (param=null) => {
    return axios.post(`${baseUrl}/client-delete`, param, headers);
}



