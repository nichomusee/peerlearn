import axios from "axios";

const API = import.meta.env.VITE_API_URL;

const client = axios.create({
  baseURL: API,
  headers: {
    "Content-Type": "application/json"
  }
});

// Notes Endpoints
export const NotesAPI = {
  list: async (userId) => {
    const res = await client.get(`/notes`, {
      params: userId ? { userId } : {}
    });
    return res.data;
  },

  create: async (payload) => {
    const res = await client.post(`/notes`, payload);
    return res.data;
  },

  update: async (id, payload) => {
    const res = await client.put(`/notes/${id}`, payload);
    return res.data;
  },

  remove: async (id) => {
    const res = await client.delete(`/notes/${id}`);
    return res.data;
  }
};
