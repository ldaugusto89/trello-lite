import { api } from './api';

export const getBoards = async () => {
  const token = localStorage.getItem('token');
  const res = await api.get('/boards', {
    headers: { Authorization: `Bearer ${token}` },
  });
  return res.data;
};

export const createBoard = async (title: string) => {
  const token = localStorage.getItem('token');
  const res = await api.post(
    '/boards',
    { title },
    {
      headers: { Authorization: `Bearer ${token}` },
    }
  );
  return res.data;
};