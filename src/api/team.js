import api from '../utils/axiosConfig.js';
const versions = '/v1';
export const createTeam = async (data) =>
    await api.post(versions + '/team', data);

export const getTeam = async (params) =>
    await api.get(versions + '/team', { params });

export const updateTeamById = async (id, data) =>
    await api.patch(versions + `/team/${id}`, data);

export const deleteUserById = async (params) =>
    await api.delete(versions + '/team/' + params);

