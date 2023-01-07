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
                                <router-link to="/" exact-active-class="active">
                                    Home
                                </router-link>
                            </li>
                            <li class="nav-item">
                                <router-link to="/synth" exact-active-class="active">
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

<style scoped lang="scss">
    @import '../assets/scss/_variables.scss';

    .navbar {
        font-family: 'IBM Plex Mono', monospace;
        align-content: right;
        padding-bottom: 20px;

        a {
            color: $pastel3;
            text-transform: uppercase;
            font-weight: 400;
            text-decoration: none;
        }
        .navbar-brand {
            // @media screen and (min-width: 992px)  {
            //     font-size: 1em;
            // }
            margin-top: 10px;
            font-size: 1.5em;
            color: $pastel1;

            &:hover,&:focus {
                color: $pastel1;
            }
            &.active {
                color: $pastel1;
                border-bottom: $pastel1 1px solid;

                &:hover,&:focus {
                    color: $pastel1;
                    border-bottom: $pastel1 1px solid;
                }
            }
        }
        .navbar-nav {
            float:right;
        }

        .nav-item {    
            padding-top: 30px;
            padding-bottom: 10px;
            padding-left: 20px;
            max-width: 200px;
            float:right;
            justify-content: flex-end;
            display: flex;

            @media screen and (min-width: 992px)  {
                padding-top:20px;
                .nav-link {
                    font-size: 1em
                }
            }

            a
            {
                color: $pastel3;
                text-transform: uppercase;
                font-size: 1.5em;
                font-weight: 400;
                text-align: right;
            }

            &:hover,&:focus {
                a {
                    color: $pastel1;
                    text-decoration: none;
                }
            }
            // no border on focus-visible
            a:focus-visible {
                outline: none;
            }
            a.active {
                color: $pastel2;
                border-bottom: $pastel2 1px solid;
                text-decoration: none;

                &:hover,&:focus,&:focus-visible {
                    color: $pastel1;
                    border-bottom: $pastel1 1px solid;
                    text-decoration: none;
                }
            }
        }

        .navbar-toggler {
            .burger-line {
                width: 50px;
                height: 3px;
                background-color: $pastel1;
                margin: 15px 0;
            }
            padding-top: 20px;
            padding-right: 0px;
            border: none!important;
            outline: none;
        }       
    }
        
</style>

