import axios from 'axios';

export default function fetchUsers() {
    let response = axios.get('/api/users')
        .catch(err => console.log("fetchUsers function Error - " + err));
    return response;
}