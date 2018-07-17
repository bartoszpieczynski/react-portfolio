import axios from 'axios';

const instance = axios.create ({
   baseURL: 'https://portfolio-210e4.firebaseio.com/'
});

export default instance;