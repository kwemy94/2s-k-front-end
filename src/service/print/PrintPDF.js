import axios from 'axios'

const baseUrl = 'http://localhost:8000/api/auth';

const header = {
    headers: {
        'Authorization': `Bearer ${localStorage.getItem('access_token')}`,
    }
}

export const printToPDF = (sector_id, param=null)=>{
    return axios.post(`${baseUrl}/client-download`, param,  header, {responseType: 'blob'})
}