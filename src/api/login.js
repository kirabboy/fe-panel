import api from '../utils/axiosConfig.js';

export const loginAPI = async (data) => await api.post('/login', data);
