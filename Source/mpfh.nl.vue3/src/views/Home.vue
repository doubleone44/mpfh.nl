<template>
<ParallaxWallpaper />
<div v-bind="$attrs" id="main">
  <div class="full-container container bg-black">
    <div class="row">
      <div class="col">
        <h1>
          Hello.
        </h1>
        <h2>
        <span class="accent1">Welcome</span> to my website
        </h2>
        <p>
          You are probably interested in my <!-- synth link --> <router-link to="/synth"> 
            <span class="accent2">javascript synthesizer</span>
          </router-link>
        </p>
        <p>
          My current hobbies include: 
        </p>
        <ul>
          <li>
            - Tea
          </li>
          <li>
            - Synthesizers
          </li>
          <li>
            - Programming
          </li>
          <li>
            - Magic: The Gathering
          </li>
          <li>
            - Mechanical Keyboards
          </li>
          <li>
            - Cooking
          </li>
        </ul>
      </div>
      <div class="spacer">

      </div>
    </div>
  </div>
</div>
</template>
  
<script setup lang='ts'>
import ParallaxWallpaper from '@/components/ParallaxWallpaper.vue';

</script>
  