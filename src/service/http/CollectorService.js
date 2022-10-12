

import axios from "axios";


const baseUrl = 'http://localhost:8000/api/auth';

const headers ={ 
    headers: {
        "Accept": 'application/json', 
        "Content-Type": 'application/json', 
        'Authorization': `Bearer ${localStorage.getItem('access_token')}`,
    }
    
};


export const CollectorService = (param=null) => {
    return axios.post(`${baseUrl}/collectors`, param, headers);
}

export const CollectorStoreService = (param=null) => {
    return axios.post(`${baseUrl}/user-store`, param, headers);
}

export const CollectorUpdateService = (id, param=null) => {
    return axios.post(`${baseUrl}/collector/update/${id}`, param, headers);
}

export const CollectorDeleteService = (param=null) => {
    return axios.post(`${baseUrl}/user-delete`, param, headers);
}



