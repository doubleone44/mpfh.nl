<template>
    <div class="header">
        <!-- <div class="container-flex bg-black"> -->
            <div class="container-fluid bg-black">
                <nav class="navbar navbar-expand-lg bg-main">
                    <button class="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarSupportedContent">
                        <div class="burger-line"></div>
                        <div class="burger-line"></div>
                        <div class="burger-line"></div>
                    </button>
                    <div class="collapse navbar-collapse" id="navbarSupportedContent">
                        <ul class="navbar-nav mr-auto">   
                            <li class="nav-item">
                                <router-link to="/" class="nav-item" exact-active-class="active">
                                    Home
                                </router-link>
                            </li>
                            <li class="nav-item">
                                <router-link to="/synth" class="nav-item" exact-active-class="active">
                                    Synth
                                </router-link>
                            </li>  
                        </ul>
                    </div>
                </nav>    
            </div>          
        <!-- </div>             -->
    </div>
</template>

<script setup lang='ts'>

</script>

<style lang="scss">

</style>

