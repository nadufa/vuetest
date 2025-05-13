<template>
  <v-app-bar color="#0F4C82" style="height: 50px" dense app dark>
    <v-app-bar-nav-icon @click="$emit('toggle-status-drawer')" />
    <v-spacer />
    <v-btn icon>
      <v-icon>mdi-magnify</v-icon>
    </v-btn>
  </v-app-bar>
</template>

<script>
export default {
  name: "AppTopBar",
};
</script>
