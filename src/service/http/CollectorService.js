

import axios from "axios";


const baseUrl = 'http://localhost:8000/api/auth';

const headers ={ 
    headers: {
        "Accept": 'application/json', 
        "Content-Type": 'application/json', 
        'Authorization': `Bearer ${localStorage.getItem('access_token')}`,
    }
    
};
const headersUpload ={ 
    headers: {
        "Accept": 'application/json', 
        "Content-Type": "multipart/form-data",
        "mode": "cors",
        'Authorization': `Bearer ${localStorage.getItem('access_token')}`,
    }
    
};


export const CollectorService = (param=null) => {
    return axios.post(`${baseUrl}/collectors`, param, headers);
}

export const CollectorStoreService = (param=null) => {
    return axios.post(`${baseUrl}/collector-store`, param, headersUpload);
}

export const CollectorUpdateService = (id, param=null) => {
    return axios.post(`${baseUrl}/collector/update/${id}`, param, headers);
}

export const CollectorDeleteService = (param=null) => {
    return axios.post(`${baseUrl}/user-delete`, param, headers);
}



