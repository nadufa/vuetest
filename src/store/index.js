import api from "@/api";
import Vue from "vue";
import Vuex from "vuex";

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    tableData: [],
    totalCount: 0,
    selectedUser: null,
    editMode: false,
    isLoading: false,
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
    setEditMode(state, value) {
      state.editMode = value;
    },
    setLoading(state, value) {
      state.isLoading = value;
    },
  },
  actions: {
    async fetchTableData({ commit }, params = {}) {
      try {
        commit("setLoading", true);
        const response = await api.fetchAll(params);
        commit("setTableData", response.data);

        let total;
        const totalHeader = response.headers["x-total-count"];
        if (totalHeader && !isNaN(parseInt(totalHeader, 10))) {
          total = parseInt(totalHeader, 10);
        } else {
          const allData = await api.fetchAll({ status: params.status });
          total = Array.isArray(allData.data) ? allData.data.length : 0;
        }

        commit("setTotalCount", total);
      } catch (error) {
        console.error("Ошибка при загрузке данных:", error);
      } finally {
        commit("setLoading", false);
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
    setEditMode({ commit }, value) {
      commit("setEditMode", value);
    },
  },
  getters: {
    tableData: (state) => state.tableData,
    totalCount: (state) => state.totalCount,
    selectedUser: (state) => state.selectedUser,
    editMode: (state) => state.editMode,
    isLoading: (state) => state.isLoading,
  },
});
