import api from "@/api";
import Vue from "vue";
import Vuex from "vuex";

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    tableData: [],
    totalCount: 0,
    selectedUser: null,
  },
  mutations: {
    setTableData(state, data) {
      state.tableData = data;
    },
    setTotalCount(state, count) {
      state.totalCount = count;
    },
    setSelectedUser(state, user) {
      state.selectedUser = user;
    },
  },
  actions: {
    async fetchTableData({ commit }, params = {}) {
      try {
        const response = await api.fetchAll(params);
        commit("setTableData", response.data);
        const total = parseInt(response.headers["x-total-count"], 10);
        if (!isNaN(total)) {
          commit("setTotalCount", total);
        }
      } catch (error) {
        console.error("Ошибка при загрузке данных:", error);
      }
    },
    async createRecord({ dispatch }, payload) {
      await api.create(payload);
      dispatch("fetchTableData");
    },
    async updateRecord({ dispatch }, { id, data }) {
      await api.update(id, data);
      dispatch("fetchTableData");
    },
    async deleteRecord({ dispatch }, id) {
      await api.delete(id);
      dispatch("fetchTableData");
    },
    async fetchRecordById(_, id) {
      return api.fetchById(id);
    },
    setSelectedUser({ commit }, user) {
      commit("setSelectedUser", user);
    },
  },
  getters: {
    tableData: (state) => state.tableData,
    totalCount: (state) => state.totalCount,
    selectedUser: (state) => state.selectedUser,
  },
});
