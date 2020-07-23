<template>
    <div id="wallpaper">
        <weather />
    </div>
</template>

<script lang='ts'>

import { Vue, Component, Prop, Watch, Mixins } from "vue-property-decorator";
import Weather from "@/components/Weather.vue"


@Component({
  components: {
      Weather
  }
})
export default class Background extends Mixins(){

}
</script>
