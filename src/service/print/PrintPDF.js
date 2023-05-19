import axios from 'axios'

const baseUrl = 'http://localhost:8000/api/auth';

const PDFHeader = {
    headers: {
        // 'Content-Type': 'multipart/form-data',
        'Authorization': `Bearer ${localStorage.getItem('access_token')}`,
    },
    'responseType': 'blob' // responseType is a sibling of headers, not a child
    
}

export const printToPDF = (sector_id, param=null)=>{
    return axios.post(`${baseUrl}/client-download/${sector_id}`, param,  PDFHeader)
}