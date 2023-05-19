import axios from "axios";


const baseUrl = 'http://localhost:8000/api/auth';

const headers ={ 
    headers: {
        "Accept": 'application/json', 
        // "Access-Control-Allow-Origin": "*", // pour corriger le probleme has been blocked by CORS policy: No 'Access-Control-Allow-Origin
        "Content-Type": 'application/json', 
        'Authorization': `Bearer ${localStorage.getItem('access_token')}`, 
    }
    
};


export const sectorService = (param=null) => {
    return axios.post(`${baseUrl}/sector`, param, headers);
}

export const sectorStoreService = (param=null) => {
    return axios.post(`${baseUrl}/sector-store`, param, headers);
}

export const sectorDeleteService = (id, param=null) => {
    return axios.post(`${baseUrl}/sector/delete/${id}`, param, headers);
}

export const sectorUpdateService = (id, param=null) => {
    return axios.post(`${baseUrl}/sector-update-${id}`, param, headers);
}

export const sectorShowService = (id, param=null) => {
    return axios.post(`${baseUrl}/sector/show/${id}`, param, headers);
}



