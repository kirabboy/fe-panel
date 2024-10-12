import api from "../utils/axiosConfig.js";
import urls from "../utils/urls.js";
const versions = "/v1";
export const createUserApi = async (data) => await api.post(urls.USERS, data);

export const getUsersApi = async (params) =>
  await api.get(urls.USERS, { params });

export const deleteUsersApi = async (id) =>
  await api.delete(`${urls.USERS}/${id}`);

export const getUsersApiById = async (params) =>
  await api.get(versions + `/users/${params}`);

export const updateUserApiById = async (id, data) =>
  await api.put(`${urls.USERS}/${id}`, data);

export const changePasswordUserApi = async (data) =>
  await api.post(versions + "/users/change-password", data);

export const updateProfileApi = async (data) =>
  await api.put(versions + `/users/profile/me`, data);
