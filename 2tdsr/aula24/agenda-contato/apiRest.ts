import axios, { AxiosInstance } from 'axios';
const apiRest : AxiosInstance = axios.create( {
    baseURL: "https://tdsr-329ac-default-rtdb.firebaseio.com"
} );

export { apiRest };