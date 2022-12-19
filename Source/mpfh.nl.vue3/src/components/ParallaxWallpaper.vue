<template>
    <div 
        id="parallax-container"
    >
      <div 
        :style="{ backgroundImage: 'url(' + require('@/img/background0.png') +')', zIndex: -14 }"
      ></div>
      <div 
        :style="{ backgroundImage: 'url(' + require('@/img/background1.png') +')', zIndex: -13 }"
      ></div>
      <div 
        :style="{ backgroundImage: 'url(' + require('@/img/background2.png') +')', zIndex: -12 }"
      ></div>
      <div 
        :style="{ backgroundImage: 'url(' + require('@/img/background3.png') +')', zIndex: -11 }"
      ></div>
</div>

</template>

<script setup lang='ts'>
    


</script>

