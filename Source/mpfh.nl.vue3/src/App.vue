<template>
  <v-app>

    <app-bar 
      @toggle-drawer="drawer = !drawer"
    />

    <navigation-drawer 
      @toggle-drawer="drawer = !drawer"
      v-model="drawer"
    />

    <v-main>
      <router-view />
    </v-main>
  </v-app>
</template>



<script setup lang="ts">
  import AppBar from "./components/AppBar.vue";
  import NavigationDrawer from "./components/NavigationDrawer.vue";

  import { ref, watch } from "vue";  

  const drawer = ref(false);
</script>

<style scoped>
@media (min-width: 1024px) {
  /* header {
    display: flex;
    place-items: center;
    padding-right: calc(var(--section-gap) / 2);
  } */

  /* header .wrapper {
    display: flex;
    place-items: flex-start;
    flex-wrap: wrap;
  } */
}
</style>
