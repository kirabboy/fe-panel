import api from '../../utils/axiosConfig';

export const fetcher = (url) => api.get(url).then((res) => res.data);
