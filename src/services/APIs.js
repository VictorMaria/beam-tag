import axios from 'axios';

export const BASE_URL = 'https://hinotethat.herokuapp.com';
export const API_URL = 'https://hinotethat.herokuapp.com/api/v1';

export const instance = axios.create({
  baseURL: API_URL,
});

const API_SERVICE = {
  post(endpoint, data) {
    return instance.post(endpoint, data);
  },
};

export default API_SERVICE;