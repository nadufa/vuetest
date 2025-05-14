<template>
  <v-app>
    <AppTopBar @toggle-status-drawer="toggleStatusDrawer" />
    <StatusDrawer
      v-model="statusDrawer"
      :statusData="statusData"
      :selectedStatus.sync="selectedStatus"
    />

    <ActionsDrawer
      :value.sync="actionsDrawer"
      :form.sync="form"
      @reset="resetForm"
      @apply="applyFilters"
    />

    <v-main>
      <MainContent
        :title="statusData[selectedStatus].text"
        :headers="headers"
        :items="tableData"
        :selectedUser="selectedUser"
        :itemsPerPage="itemsPerPage"
        :page="page"
        :pageCount="pageCount"
        :drawerOpen="statusDrawer"
        @refresh="refreshData"
        @open-drawer="openDrawer"
        @delete="deleteSelected"
        @update:itemsPerPage="itemsPerPage = $event"
        @update:page="page = $event"
        @select-user="onSelectUser"
      />
    </v-main>
  </v-app>
</template>

<script>
import ActionsDrawer from "@/components/ActionsDrawer.vue";
import AppTopBar from "@/components/AppTopBar.vue";
import MainContent from "@/components/MainContent.vue";
import StatusDrawer from "@/components/StatusDrawer.vue";
import { mapActions, mapGetters } from "vuex";

export default {
  name: "App",
  components: {
    AppTopBar,
    StatusDrawer,
    ActionsDrawer,
    MainContent,
  },
  data: () => ({
    statusDrawer: true,
    actionsDrawer: false,
    selectedStatus: 0,
    statusData: [
      { icon: "mdi-view-list", text: "Все" },
      { icon: "mdi-check-circle-outline", text: "Обработанные" },
      { icon: "mdi-alert-circle-outline", text: "Не обработанные" },
    ],
    form: {
      firstName: "",
      lastName: "",
      company: "",
      position: "",
      phone: "",
      email: "",
      interests: "",
    },
    headers: [
      { text: "Имя", value: "firstName" },
      { text: "Фамилия", value: "lastName" },
      { text: "Компания", value: "company" },
      { text: "Специальность", value: "job" },
      { text: "Телефон", value: "phone" },
      { text: "E-mail", value: "email" },
      { text: "Интересы", value: "interests" },
    ],
    itemsPerPage: 10,
    page: 1,
  }),
  computed: {
    ...mapGetters(["tableData", "selectedUser", "editMode"]),
    currentStatus() {
      return this.selectedStatus === 0
        ? undefined
        : this.selectedStatus === 1
        ? "processed"
        : "unprocessed";
    },
    isEditMode() {
      return this.$store.getters.editMode;
    },
    pageCount() {
      return Math.ceil(this.$store.getters.totalCount / this.itemsPerPage);
    },
  },
  methods: {
    ...mapActions([
      "fetchTableData",
      "setSelectedUser",
      "updateRecord",
      "createRecord",
      "setEditMode",
    ]),

    toggleStatusDrawer() {
      this.statusDrawer = !this.statusDrawer;
    },

    toggleActionsDrawer() {
      this.actionsDrawer = !this.actionsDrawer;
    },

    resetForm() {
      this.form = {
        firstName: "",
        lastName: "",
        company: "",
        position: "",
        phone: "",
        email: "",
        interests: "",
      };
    },

    async applyFilters() {
      if (this.editMode) {
        try {
          await this.updateRecord({ id: this.form.id, data: this.form });
          this.$toast?.success("Пользователь обновлён");
        } catch (e) {
          console.error("Ошибка при обновлении:", e);
          this.$toast?.error("Ошибка при обновлении пользователя");
        }
      } else {
        try {
          await this.createRecord(this.form);
          this.$toast?.success("Пользователь добавлен");
        } catch (e) {
          console.error("Ошибка при добавлении:", e);
          this.$toast?.error("Ошибка при добавлении пользователя");
        }
      }

      this.actionsDrawer = false;
      this.setSelectedUser(null);
      this.setEditMode(false);
      this.resetForm();
      this.refreshData();
    },

    refreshData() {
      console.log(this.currentStatus);

      this.fetchTableData({
        _page: this.page,
        _limit: this.itemsPerPage,
        status: this.currentStatus,
      });
    },

    openDrawer(mode) {
      if (mode === "edit" && this.selectedUser) {
        this.form = { ...this.selectedUser };
        this.setEditMode(true);
      } else {
        this.resetForm();
        this.setEditMode(false);
      }
      this.actionsDrawer = true;
    },

    onSelectUser(user) {
      this.setSelectedUser(user);
    },

    async deleteSelected() {
      if (!this.selectedUser || !this.selectedUser.id) {
        this.$toast?.error("Пользователь не выбран");
        return;
      }

      const confirmed = confirm(
        `Удалить пользователя ${this.selectedUser.firstName} ${this.selectedUser.lastName}?`
      );
      if (!confirmed) return;

      try {
        await this.$store.dispatch("deleteRecord", this.selectedUser.id);
        this.setSelectedUser(null);
      } catch (error) {
        console.error("Ошибка при удалении пользователя:", error);
      }
    },

    cleanForm() {
      const result = {};
      Object.entries(this.form).forEach(([key, value]) => {
        if (value) result[key] = value;
      });
      return result;
    },
  },

  watch: {
    page() {
      this.refreshData();
    },
    selectedStatus() {
      this.refreshData();
    },
    itemsPerPage() {
      this.refreshData();
    },
    model() {
      this.refreshData();
    },
  },

  mounted() {
    this.refreshData();
  },
};
</script>
