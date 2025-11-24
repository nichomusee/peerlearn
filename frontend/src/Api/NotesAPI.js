// src/api/NotesAPI.js
import axios from "axios";

const BASE_URL = "http://localhost:5000/api/notes"; // adjust if needed

const NotesAPI = {
  async list(userId) {
    const res = await axios.get(`${BASE_URL}?userId=${userId}`);
    return res.data;
  },

  async create(payload) {
    const res = await axios.post(BASE_URL, payload);
    return res.data;
  },

  async update(id, payload) {
    const res = await axios.put(`${BASE_URL}/${id}`, payload);
    return res.data;
  },

  async remove(id) {
    await axios.delete(`${BASE_URL}/${id}`);
  },
};

export default NotesAPI;
