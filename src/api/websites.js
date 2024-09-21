import api from '@/utils/axiosConfig.js';
const versions = '/v1';
export const createSiteApi = async (data) =>
  await api.post(versions + '/websites', data);

export const getSiteApi = async (params) =>
  await api.get(versions + '/websites', { params });
