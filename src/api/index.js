import axios from "axios";

const BASE_URL = "https://retoolapi.dev/wXtqL8/data";

export default {
  fetchAll(params) {
    return axios.get(BASE_URL, { params }); // _page, _limit, firstName, status
  },
  fetchById(id) {
    return axios.get(`${BASE_URL}/${id}`);
  },
  create(data) {
    return axios.post(BASE_URL, data);
  },
  update(id, data) {
    return axios.put(`${BASE_URL}/${id}`, data);
  },
  patch(id, data) {
    return axios.patch(`${BASE_URL}/${id}`, data);
  },
  delete(id) {
    return axios.delete(`${BASE_URL}/${id}`);
  },
};
