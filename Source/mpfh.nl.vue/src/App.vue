<template>
  <div id="app">
<!-- 
    <div id="nav">
      <router-link to="/">Home</router-link> |
      <router-link to="/about">About</router-link>
    </div> -->
    <router-view/>
  </div>
</template>


<script lang='ts'>

import Vue from "vue";
import Navigation from "@/components/Navigation.vue"
import { Component, Prop } from "vue-property-decorator";

@Component({
    components: {
        //NavBar,
        Navigation,
    },
})
export default class App extends Vue {}

</script>




<style lang="scss">
#app {
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
}

@import "assets/styles/app.scss";
</style>