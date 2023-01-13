<template>
    <v-app-bar app
        :elevation="0"
        color="background"
    >
        <template v-slot:prepend>
            <v-app-bar-nav-icon
                color="primary"
                @click.stop="toggleDrawer()"
            >

            </v-app-bar-nav-icon>
        </template>

        <v-app-bar-title
            class=""
        >
            <span color="text-primary">
                mpfh - {{ $route.name }} 
            </span>
        </v-app-bar-title>

        <!-- <v-spacer></v-spacer> -->

        <template v-slot:append>
            <v-btn 
                v-if="dark"
                icon="mdi-weather-night" 
                @click="dark = false"
                @click.stop="toggleTheme()" >
            </v-btn>
            <v-btn
                v-else
                icon="mdi-weather-sunny"
                @click="dark = true"
                @click.stop="toggleTheme()" >
            </v-btn>
        </template>

    </v-app-bar>
</template>

<script setup lang='ts'>
import { ref, defineEmits, defineProps, computed } from 'vue';
import { useTheme } from 'vuetify'

const emit = defineEmits(['toggle-drawer']);

const theme = useTheme()

let dark = ref(theme.global.current.value.dark)

const toggleDrawer = () => {
    emit('toggle-drawer');
}

const toggleTheme = () => {
    theme.global.name.value = theme.global.current.value.dark ? 'lightTheme' : 'darkTheme'
}

</script>

<style lang="scss">
    @import '../assets/scss/_variables.scss';

    .v-toolbar {
        font-family: 'IBM Plex Mono', monospace;
        margin-bottom: 20px;

        .v-app-bar-nav-icon {
            font-size: 2rem;
            padding: 5px;
            margin-left: 5px;
        }

        .v-toolbar-title {
            font-size: 2rem;
            color: rgb(var(--v-theme-on-background));
            
            &__placeholder {
                padding: 5px!important;
            }
        }

    //     .navbar-nav {
    //         float:right;
    //     }

    //     .nav-item {    
    //         padding-top: 30px;
    //         padding-bottom: 10px;
    //         padding-left: 20px;
    //         max-width: 200px;
    //         float:right;
    //         justify-content: flex-end;
    //         display: flex;

    //         @media screen and (min-width: 992px)  {
    //             padding-top:20px;
    //             .nav-link {
    //                 font-size: 1em
    //             }
    //         }

    //         a
    //         {
    //             color: var(--text-color);
    //             font-size: 1.5em;
    //             font-weight: 400;
    //             text-align: right;
    //         }

    //         &:hover,&:focus {
    //             a {
    //                 color: $pastel1;
    //                 text-decoration: none;
    //             }
    //         }
    //         // no border on focus-visible
    //         a:focus-visible {
    //             outline: none;
    //         }
    //         a.active {
    //             color: $pastel2;
    //             border-bottom: $pastel2 1px solid;
    //             text-decoration: none;

    //             &:hover,&:focus,&:focus-visible {
    //                 color: $pastel1;
    //                 border-bottom: $pastel1 1px solid;
    //                 text-decoration: none;
    //             }
    //         }
    //     }
    // }
    }
        
</style>

