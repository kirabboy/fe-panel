import axios from 'axios';
import api from '../utils/axiosConfig';
import urls from '../utils/urls';

export const UseCreateVPS = async (body) => {
  try {
    const res = await api.post(urls.VPS, body);
    return res;
  } catch (error) {
    if (axios.isAxiosError(error)) {
      console.error('Error message:', error.message);
    } else {
      console.error('Unexpected error:', error);
    }
    return error;
  }
};

export const UseUpdateVPS = async (id, body) => {
  try {
    const res = await api.put(`${urls.VPS}/${id}`, body);
    return res;
  } catch (error) {
    if (axios.isAxiosError(error)) {
      console.error('Error message:', error.message);
    } else {
      console.error('Unexpected error:', error);
    }
    return error;
  }
};

export const UseDeleteVPS = async (id) => {
  try {
    const res = await api.delete(`${urls.VPS}/${id}`);
    return res;
  } catch (error) {
    if (axios.isAxiosError(error)) {
      console.error('Error message:', error.message);
    } else {
      console.error('Unexpected error:', error);
    }
    return error;
  }
};
