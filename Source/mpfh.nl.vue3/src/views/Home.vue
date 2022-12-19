<template>
  <div>
    <navigation />
    <div 
      id="parallax-container"
    >
      <div :style="{ backgroundImage: `url(${background0})`, zIndex: -14 }"></div>
      <div :style="{ backgroundImage: `url(${background1})`, zIndex: -13 }"></div>
      <div :style="{ backgroundImage: `url(${background2})`, zIndex: -12 }"></div>
      <div :style="{ backgroundImage: `url(${background3})`, zIndex: -11 }"></div>
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
  