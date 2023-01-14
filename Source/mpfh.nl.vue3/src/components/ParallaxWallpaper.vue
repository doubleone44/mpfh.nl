<template>
  <div 
    id="parallax-container"
  >
    <div 
      v-for="i in 4"
      :style="backgroundStyleString(i-1)"
    >}</div>
  </div>
</template>

<script setup lang='ts'>

import { watch, ref } from 'vue';
import { useTheme } from 'vuetify'

const theme = useTheme()

const dark = ref(theme.global.current.value.dark)

function backgroundStyleString(i: number) {
    let dark = theme.global.current.value.dark
    return 'background-image: url("/src/assets/background' + i + (dark ? "" : "_light") + '.png"); z-index: ' + i + ';';
}
      
watch(dark, () => {
  let parent = document.getElementById('parallax-container');
  if(parent != null) {
    let children = parent.getElementsByTagName('div');
    for(let i = 0; i < children.length; i++) {
      children[i].style.transform = 'translateY(-' + (window.pageYOffset * 1.5 * (i+1) / children.length) + 'px)';
    }
  }
});

window.addEventListener('scroll', () => {
    let parent = document.getElementById('parallax-container');
    if(parent != null) {
    let children = parent.getElementsByTagName('div');
    for(let i = 0; i < children.length; i++) {
      children[i].style.transform = 'translateY(-' + (window.pageYOffset * 1.5 * (i+1) / children.length) + 'px)';
    }
    }
}, false)

</script>

<style scoped lang="scss">
  @import '../assets/scss/_variables.scss';
  #parallax-container {
    display: block;
    height: 90vh;
    position: relative;
    overflow: hidden;

    @media screen and (min-width: 992px)  { 
        height: calc(100vh - 70px); 
    }

    div {
        position: fixed;
        top: 0;
        background-position: center right !important;
        background-size: cover;
        transform: translateY(0px);
        height: 150vh;
        width: 100%;
        }

    &::before, &::after {
        background-color: rgb(var(--v-theme-background));
        z-index: 20;
        position: absolute;
        content: '';
        bottom: 0vh;
        width: #{'calc(50% + 10px)'};
        /* don't change */
        height: 50px;
        /* must be equal to padding-top */
        // background: $black;
        overflow-x: hidden;

        @media screen and (min-width: 992px)  { 
            bottom:0; 
        }

    }
    &::before {
        left: 0;
        transform: skew(45deg);
        transform-origin: right bottom;
    }
    &::after {
        right: 0;
        transform: skew(-45deg);
        transform-origin: left bottom;
    }
  }
</style>