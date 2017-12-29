import axios from 'axios';

const instance = axios.create({
  baseURL: 'https://react-myburger-a7627.firebaseio.com/'
});

export default instance;
