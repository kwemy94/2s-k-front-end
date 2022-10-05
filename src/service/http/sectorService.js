import axios from "axios";


const baseUrl = 'http://localhost:8000/api/auth';

const headers ={ 
    headers: {
        "Accept": 'application/json', 
        "Content-Type": 'application/json', 
        'Authorization': `Bearer ${localStorage.getItem('access_token')}`,
    }
    
};


export const sectorService = (param=null) => {
    return axios.get(`${baseUrl}/sector`, param, headers);
}

export const sectorStoreService = (param=null) => {
    return axios.post(`${baseUrl}/sector-store`, param, headers);
}

export const sectorDeleteService = (param=null) => {
    return axios.post(`${baseUrl}/sector-delete`, param, headers);
}

export const sectorUpdateService = (id, param=null) => {
    return axios.post(`${baseUrl}/sector-update-${id}`, param, headers);
}



