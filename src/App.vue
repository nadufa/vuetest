<template>
  <v-app>
    <app-top-bar @toggle-status-drawer="toggleStatusDrawer" />

    <status-drawer v-model="statusDrawer" :items="items" :model.sync="model" />

    <actions-drawer
      :value.sync="actionsDrawer"
      :form.sync="form"
      @reset="resetForm"
      @apply="applyFilters"
    />

    <v-main>
      <MainContent
        :title="items[model].text"
        :headers="headers"
        :items="tableData"
        :itemsPerPage="itemsPerPage"
        :page="page"
        :pageCount="pageCount"
        :drawerOpen="statusDrawer"
        @refresh="refreshData"
        @open-drawer="openDrawer"
        @delete="deleteSelected"
        @update:itemsPerPage="itemsPerPage = $event"
        @update:page="page = $event"
      />
    </v-main>
  </v-app>
</template>

<script>
import ActionsDrawer from "@/components/ActionsDrawer.vue";
import AppTopBar from "@/components/AppTopBar.vue";
import MainContent from "@/components/MainContent.vue";
import StatusDrawer from "@/components/StatusDrawer.vue";

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
    model: 0,
    items: [
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
    tableData: [
      {
        id: 3,
        job: "COO",
        email: "hmacquire3y@fema.gov",
        phone: "(555) 758-4014",
        company: "Twitter",
        lastName: "Berryann",
        firstName: "Johannah",
        interests: "Computer programming",
      },
      {
        id: 4,
        job: "Project Manager",
        email: "gblanchflower3u@nasa.gov",
        phone: "(555) 292-5353",
        company: "Home Depot",
        lastName: "Guerre",
        firstName: "Hunterrrr",
        interests: "Cycling",
      },
      {
        id: 5,
        job: "Engineering Manager",
        email: "tbanger23@sbwire.com",
        phone: "(555) 896-4164",
        company: "Ford Motor",
        lastName: "Gristock",
        firstName: "Ellwood",
        interests: "Board games",
      },
    ],
    itemsPerPage: 10,
    page: 1,
  }),
  computed: {
    pageCount() {
      return Math.ceil(this.tableData.length / this.itemsPerPage);
    },
  },
  methods: {
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
    applyFilters() {
      console.log("Применяем фильтры:", this.form);
    },
    refreshData() {
      console.log("Обновление данных...");
    },
    openDrawer(mode) {
      console.log(`${mode === "add" ? "Добавление" : "Редактирование"}`);
      this.actionsDrawer = true;
    },
    deleteSelected() {
      console.log("Удаление выбранных записей");
    },
  },
};
</script>
