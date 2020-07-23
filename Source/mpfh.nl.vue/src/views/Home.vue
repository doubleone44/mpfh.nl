<template>
  <div>
    <navigation />
    <div id="parallax-container">
      <div 
        :style="{ backgroundImage: 'url(' + require('@/img/background0.png') +')', zIndex: '-14' }"
      ></div>
      <div 
        :style="{ backgroundImage: 'url(' + require('@/img/background1.png') +')', zIndex: '-13' }"
      ></div>
      <div 
        :style="{ backgroundImage: 'url(' + require('@/img/background2.png') +')', zIndex: '-12' }"
      ></div>
      <div 
        :style="{ backgroundImage: 'url(' + require('@/img/background3.png') +')', zIndex: '-11' }"
      ></div>
    </div>

    <div id="main">
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
              <s>It may or may not include actual content at some point in the future.</s><br/>
              Edit: does now contain content: <router-link to="/synth">a javascript synthesizer</router-link>
            </p>
            <p>
              My current hobbies include: 
            </p>
            <ul>
              <li>
                - Tea
              </li>
              <li>
                - Mechanical Keyboards
              </li>
              <li>
                - Cooking
              </li>
              <li>
                - Cheese
              </li>
              <li>
                - Dying of exam stress
              </li>
            </ul>
          </div>
          <div class="spacer">
    
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script lang='ts'>

window.addEventListener('scroll', () => {
   let parent = document.getElementById('parallax-container');
   if(parent != null) {
    let children = parent.getElementsByTagName('div');
    for(let i = 0; i < children.length; i++) {
      children[i].style.transform = 'translateY(-' + (window.pageYOffset * 1.5 * (i+1) / children.length) + 'px)';
    }
   }

}, false)

import { Vue, Component, Prop, Watch, Mixins } from "vue-property-decorator";
import Navigation from "@/components/Navigation.vue"

@Component({
  components: {
    Navigation
  }
})
export default class Home extends Mixins(){

}
</script>
