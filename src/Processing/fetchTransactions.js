import axios from 'axios';

export default function fetchTransactions() {
    let response = axios.get('/api/transactions').catch((err) => { console.log("Error - " + err); });
    return response;
}