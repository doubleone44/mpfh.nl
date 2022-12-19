<script setup lang="ts">
import Navigation from "./components/Navigation.vue";
</script>

<template>
  <header>
    <Navigation />
  </header>
  <main>
    <router-view />
  </main>
</template>

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
