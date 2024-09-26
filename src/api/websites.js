import api from '@/utils/axiosConfig.js';
const versions = '/v1';
export const createSiteApi = async (data) =>
  await api.post(versions + '/websites', data);

export const getSiteApi = async (params) =>
  await api.get(versions + '/websites', {
    params,
    headers: {
      VpsIpAddress: '113.192.18.127',
    },
  });

export const updateSiteApi = async (id, data) =>
  await api.put(versions + `/websites/${id}`, data);

export const deleteSiteApi = async (id) =>
  await api.delete(versions + `/websites/${id}`);

export const createSiteManyApi = async (data) =>
  await api.post(versions + '/websites/many', data);
