import axios from 'axios';

export default function fetchAssets() {
    let response = axios.get('/api/assets')
        .catch(err => console.log("fetchAssets function Error - " + err));
    return response;
}

