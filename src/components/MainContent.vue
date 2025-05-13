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

      <v-data-table
        :headers="headers"
        :items="items"
        :items-per-page="localItemsPerPage"
        :page="localPage"
        class="elevation-1"
        hide-default-footer
        @pagination="onPagination"
      ></v-data-table>

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
  },
};
</script>
