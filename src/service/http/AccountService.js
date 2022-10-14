import axios from "axios";


const baseUrlConfig = 'http://localhost:8000/api/auth';

const headers ={ 
    headers: {
        "Accept": 'application/json', 
        "Content-Type": 'application/json', 
        'Authorization': `Bearer ${localStorage.getItem('access_token')}`,
    }
    
};

export const accountHistoService = (clientId, param=null) => {
    return axios.post(`${baseUrlConfig}/account/historique/${clientId}`, param, headers);
}

