<template>
  <parallax-wallpaper />
  <div
    class="wrapper"
  >
    <v-container 
    color="background"
    v-bind="$attrs">
      <h1>
        Hello.
      </h1>
      <h2>
      <span class="text-primary">Welcome</span> to my website
      </h2>
      <p>
        You are probably interested in my <!-- synth link --> <router-link to="/synth"> 
          <span class="">javascript synthesizer</span>
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
      <div class="spacer"></div>  
    </v-container>
  </div>
</template>
  
<script setup lang='ts'>
import ParallaxWallpaper from '@/components/ParallaxWallpaper.vue';

</script>
  