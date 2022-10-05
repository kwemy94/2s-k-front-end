

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
    return axios.get(`${baseUrl}/sector`, param, headers);
}

export const CollectorStoreService = (param=null) => {
    return axios.post(`${baseUrl}/sector-store`, param, headers);
}

export const CollectorDeleteService = (param=null) => {
    return axios.post(`${baseUrl}/sector-delete`, param, headers);
}



