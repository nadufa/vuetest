<template>
  <v-container fluid :style="containerStyle">
    <v-card flat class="pa-4">
      <v-row align="center" justify="space-between">
        <v-col cols="12" md="4">
          <h3>{{ title }}</h3>
        </v-col>
        <v-col cols="12" md="4" class="d-flex align-center">
          <v-btn icon @click="$emit('refresh')">
            <v-icon>mdi-refresh</v-icon>
          </v-btn>
        </v-col>
        <v-col cols="12" md="4" class="d-flex justify-end">
          <v-menu bottom left>
            <template v-slot:activator="{ on, attrs }">
              <v-btn
                v-bind="attrs"
                v-on="on"
                dark
                :style="{ backgroundColor: '#0F4C82' }"
              >
                Действия
                <v-icon right>mdi-menu-down</v-icon>
              </v-btn>
            </template>
            <v-list>
              <v-list-item @click="$emit('open-drawer', 'add')">
                <v-list-item-title>Добавить</v-list-item-title>
              </v-list-item>
              <v-list-item @click="$emit('open-drawer', 'edit')">
                <v-list-item-title>Изменить</v-list-item-title>
              </v-list-item>
              <v-list-item @click="$emit('delete')">
                <v-list-item-title>Удалить</v-list-item-title>
              </v-list-item>
            </v-list>
          </v-menu>
        </v-col>
      </v-row>

      <!-- Добавляем индикатор загрузки -->
      <v-row v-if="loading" justify="center" class="my-4">
        <v-progress-circular
          indeterminate
          color="primary"
          size="64"
          width="6"
        ></v-progress-circular>
      </v-row>

      <v-data-table
        v-if="!loading"
        :headers="headers"
        :items="items"
        :items-per-page="localItemsPerPage"
        :page="localPage"
        item-key="id"
        class="elevation-1 custom-data-table"
        hide-default-footer
        @pagination="onPagination"
        @click:row="selectRow"
        :item-class="getItemClass"
      >
        <template v-slot:body="{ items }">
          <tbody>
            <tr
              v-for="item in items"
              :key="item.id"
              :class="{
                'v-data-table__selected':
                  selectedUser && item.id === selectedUser.id,
                'selected-row': selectedUser && item.id === selectedUser.id,
              }"
              @click="selectRow(item)"
            >
              <td v-for="header in headers" :key="header.value">
                {{ item[header.value] }}
              </td>
            </tr>
          </tbody>
        </template>
      </v-data-table>

      <v-row class="mt-4" align="center" justify="space-between">
        <v-col cols="12" md="6">
          <v-select
            v-model="localItemsPerPage"
            :items="[5, 10, 20]"
            label="Количество элементов на странице"
            dense
            hide-details
            outlined
            style="max-width: 200px"
            @change="updateItemsPerPage"
          ></v-select>
        </v-col>
        <v-col cols="12" md="6" class="d-flex justify-end">
          <v-pagination
            :value="localPage"
            :length="pageCount"
            total-visible="5"
            @input="updatePage"
          ></v-pagination>
        </v-col>
      </v-row>
    </v-card>
  </v-container>
</template>

<script>
export default {
  name: "MainContent",
  props: {
    title: String,
    headers: Array,
    items: Array,
    itemsPerPage: Number,
    page: Number,
    pageCount: Number,
    drawerOpen: Boolean,
    selectedUser: Object,
  },
  data() {
    return {
      localItemsPerPage: this.itemsPerPage,
      localPage: this.page,
    };
  },
  watch: {
    itemsPerPage(val) {
      this.localItemsPerPage = val;
    },
    page(val) {
      this.localPage = val;
    },
  },
  computed: {
    containerStyle() {
      return {
        marginLeft: this.drawerOpen ? "250px" : "0px",
        height: "100%",
        backgroundColor: "#F5F5F5",
        transition: "margin 0.3s ease, width 0.3s ease",
        paddingTop: "20px",
        width: this.drawerOpen ? "calc(100vw - 250px)" : "100vw",
      };
    },
    loading() {
      return this.$store.getters.loading;
    },
  },
  methods: {
    updateItemsPerPage(val) {
      this.$emit("update:itemsPerPage", val);
    },
    updatePage(val) {
      this.localPage = val;
      this.$emit("update:page", val);
    },
    onPagination(pagination) {
      if (pagination.itemsPerPage !== this.localItemsPerPage) {
        this.updateItemsPerPage(pagination.itemsPerPage);
      }
      if (pagination.page !== this.localPage) {
        this.updatePage(pagination.page);
      }
    },
    selectRow(item) {
      this.$emit("select-user", item);
    },
    getItemClass(item) {
      return this.selectedUser && item.id === this.selectedUser.id
        ? "selected-row"
        : "";
    },
  },
};
</script>

<style scoped>
.selected-row {
  background-color: #e0e0e0 !important;
}
</style>
