import axios from 'axios';

const api = axios.create({
  baseURL: 'http://localhost:8000/',
  // baseURL: 'http://ec2-65-0-179-64.ap-south-1.compute.amazonaws.com:8000/',           
});

export default api;