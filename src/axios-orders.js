import axios from 'axios';

const instance = axios.create({
    baseURL: 'https://my-react-burger-app-35d96.firebaseio.com/'
});

export default instance;