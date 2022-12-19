<template>
    <div class="header">
        <!-- <div class="container-flex bg-black"> -->
            <div class="container-fluid bg-black">
                <nav class="navbar navbar-expand-lg bg-main">
                    <!-- <button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
                        <span class="navbar-toggler-icon"></span>
                    </button> -->
                    <button class="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarSupportedContent">
                        <div class="burger-line"></div>
                        <div class="burger-line"></div>
                        <div class="burger-line"></div>
                    </button>
                    <div class="collapse navbar-collapse" id="navbarSupportedContent">
                        <ul class="navbar-nav mr-auto">   

                            <router-link to="/" class="nav-item" exact-active-class="active">
                                <li class="nav-item">
                                    
                                </li>
                            </router-link>

                            <router-link to="/synth" class="nav-item" exact-active-class="active">
                                <li class="nav-item">
                                    Synth
                                </li>
                            </router-link>
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

