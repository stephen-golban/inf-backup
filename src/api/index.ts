import axios, { type AxiosRequestConfig } from 'axios';

const api = axios.create({
  baseURL: 'https://imobil-3adc7768c376.herokuapp.com/',
  headers: {
    'Content-Type': 'application/json',
  },
});

const fetcher = async <Data>(config: AxiosRequestConfig): Promise<Data> => {
  const response = await api.request<Data>(config);
  return response.data;
};

export { api, fetcher };
