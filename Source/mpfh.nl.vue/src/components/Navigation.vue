<template>
    <div class="header">
        <div class="container-flex bg-black">
            <div class="container">
                <nav class="navbar navbar-expand-lg bg-main">
                    <!-- <a class="navbar-brand" href="#">Mees <span class="darken">Hendriks</span></a> -->
                    <button class="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarSupportedContent">
                        <div class="burger-line"></div>
                        <div class="burger-line"></div>
                        <div class="burger-line"></div>
                    </button>
                    <div class="collapse navbar-collapse" id="navbarSupportedContent">
                        <ul class="navbar-nav mr-auto">   
                            <router-link 
                                to="/"
                                v-slot="{ href, route, navigate, isActive, isExactActive }"
                            >
                                <li :class="{active: isExactActive}" class="nav-item">
                                    <a :href="href" @click="navigate">
                                        Home
                                    </a>
                                </li>
                            </router-link>
                            
                            <router-link 
                                to="/synth"
                                v-slot="{ href, route, navigate, isActive, isExactActive }"
                            >
                                <li :class="{active: isExactActive}" class="nav-item">
                                    <a :href="href" @click="navigate">
                                        Synth
                                    </a>
                                </li>
                            </router-link>
                        </ul>
                    </div>
                </nav>    
            </div>          
        </div>            
    </div>
</template>

<script lang='ts'>

import { Vue, Component, Prop, Watch, Mixins } from "vue-property-decorator";

@Component({
  components: {
  }
})
export default class Navigation extends Mixins(){
    
}
</script>
