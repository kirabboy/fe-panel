import api from '../utils/axiosConfig.js';
const versions = '/v1';
export const createaUserApi = async (data) =>
  await api.post(versions + '/users', data);

export const getUsersApi = async (params) =>
  await api.get(versions + '/users', { params });

export const deleteUsersApi = async (params) =>
  await api.delete(versions + '/users/' + params);

export const getUsersApiById = async (params) =>
  await api.get(versions + `/users/${params}`);

export const updateUserApiById = async (id, data) =>
  await api.put(versions + `/users/${id}`, data);

export const changePasswrodUserApi = async (data) =>
  await api.post(versions + '/users/change-password', data);

export const updateProfileApi = async (data) =>
  await api.put(versions + `/users/profile/me`, data);
