<template>
  <v-navigation-drawer
    v-model="drawerValue"
    fixed
    stateless
    disable-resize-watcher
    touchless
    elevation="2"
    width="250"
    style="top: 50px; height: calc(100vh - 50px)"
  >
    <v-list>
      <v-list-item>
        <v-list-item-content>
          <v-list-item-title class="headline">Профили</v-list-item-title>
        </v-list-item-content>
      </v-list-item>

      <v-list-item-group
        v-model="internalModel"
        mandatory
        color="indigo"
        @change="onModelChange"
      >
        <v-list-item v-for="(item, i) in items" :key="i">
          <v-list-item-icon>
            <v-icon v-text="item.icon"></v-icon>
          </v-list-item-icon>
          <v-list-item-content>
            <v-list-item-title v-text="item.text"></v-list-item-title>
          </v-list-item-content>
        </v-list-item>
      </v-list-item-group>
    </v-list>
  </v-navigation-drawer>
</template>

<script>
export default {
  name: "StatusDrawer",
  props: {
    value: {
      type: Boolean,
      required: true,
    },
    model: {
      type: Number,
      required: true,
    },
    items: {
      type: Array,
      required: true,
    },
  },
  computed: {
    drawerValue: {
      get() {
        return this.value;
      },
      set(val) {
        this.$emit("input", val);
      },
    },
    internalModel: {
      get() {
        return this.model;
      },
      set(val) {
        this.$emit("update:model", val);
      },
    },
  },
  methods: {
    onModelChange(val) {
      this.$emit("update:model", val);
    },
  },
};
</script>
