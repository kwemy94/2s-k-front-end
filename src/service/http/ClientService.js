

import axios from "axios";


const baseUrl = 'http://localhost:8000/api/auth';

const headers ={ 
    headers: {
        "Accept": 'application/json', 
        "Content-Type": 'application/json', 
        'Authorization': `Bearer ${localStorage.getItem('access_token')}`,
    }
    
};
const headers2 ={ 
    headers: {
        "Accept": 'application/json', 
        "Content-Type": "multipart/form-data",
        'Authorization': `Bearer ${localStorage.getItem('access_token')}`,
    }
    
};


export const clientService = (param=null) => {
    return axios.post(`${baseUrl}/client`, param, headers);
}
export const clientParSecteurService = (userPhone, param=null) => {
    return axios.post(`${baseUrl}/client/par-secteur/${userPhone}`, param, headers);
}

export const clientStoreService = (param=null) => {
    return axios.post(`${baseUrl}/user-store`, param, headers2);
}

export const clientDeleteService = (id, param=null) => {
    return axios.post(`${baseUrl}/client/delete/${id}`, param, headers);
}

export const clientUpdateService = (id, param=null) => {
    return axios.post(`${baseUrl}/client/update/${id}`, param, headers);
}



