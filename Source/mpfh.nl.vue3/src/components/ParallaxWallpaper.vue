<template>
  <div id="parallax-container">
    <div :style="{ backgroundImage: `url(${background0})`, zIndex: -14 }"></div>
    <div :style="{ backgroundImage: `url(${background1})`, zIndex: -13 }"></div>
    <div :style="{ backgroundImage: `url(${background2})`, zIndex: -12 }"></div>
    <div :style="{ backgroundImage: `url(${background3})`, zIndex: -11 }"></div>
  </div>
</template>

<script setup lang='ts'>
      
import background0 from '../assets/background0.png';
import background1 from '../assets/background1.png';
import background2 from '../assets/background2.png';
import background3 from '../assets/background3.png';

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

