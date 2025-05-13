<template>
  <v-navigation-drawer
    :value="value"
    right
    fixed
    disable-resize-watcher
    touchless
    elevation="2"
    width="400"
    temporary
    style="top: 50px; height: calc(100vh - 50px)"
    @input="$emit('update:value', $event)"
  >
    <v-form
      ref="filterForm"
      class="pa-4 d-flex flex-column justify-space-between fill-height"
    >
      <div>
        <v-text-field
          :value="form.firstName"
          @input="updateField('firstName', $event)"
          label="Имя"
          outlined
          dense
        />
        <v-text-field
          :value="form.lastName"
          @input="updateField('lastName', $event)"
          label="Фамилия"
          outlined
          dense
        />
        <v-text-field
          :value="form.company"
          @input="updateField('company', $event)"
          label="Компания"
          outlined
          dense
        />
        <v-text-field
          :value="form.position"
          @input="updateField('position', $event)"
          label="Специальность"
          outlined
          dense
        />
        <v-text-field
          :value="form.phone"
          @input="updateField('phone', $event)"
          label="Телефон"
          outlined
          dense
        />
        <v-text-field
          :value="form.email"
          @input="updateField('email', $event)"
          label="Email"
          outlined
          dense
        />
        <v-text-field
          :value="form.interests"
          @input="updateField('interests', $event)"
          label="Интересы"
          outlined
          dense
        />
      </div>

      <div class="mt-4 d-flex justify-end">
        <v-btn color="grey lighten-2" class="mr-2" @click="$emit('reset')">
          Очистить
        </v-btn>
        <v-btn
          :style="{ backgroundColor: '#0F4C82', color: 'white' }"
          @click="$emit('apply')"
        >
          Применить
        </v-btn>
      </div>
    </v-form>
  </v-navigation-drawer>
</template>

<script>
export default {
  name: "ActionsDrawer",
  props: {
    value: Boolean,
    form: Object,
  },
  methods: {
    updateField(field, value) {
      this.$emit("update:form", {
        ...this.form,
        [field]: value,
      });
    },
  },
};
</script>
