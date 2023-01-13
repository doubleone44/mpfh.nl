<template>
    <v-navigation-drawer app
        :elevation="10"
        color="background"
    >   
        <!-- Routes to Home, Synth and Tea -->
        <v-list-item-group>
            <v-list-item
                v-for="route in routes"
                :key="route.name"
                :to="route.path"
                link
                exact
            >
                <v-list-item-icon>
                    <v-icon>{{ route.icon }}</v-icon>
                </v-list-item-icon>
                <v-list-item-content>
                    <v-list-item-title>{{ route.name }}</v-list-item-title>
                </v-list-item-content>
            </v-list-item>
        </v-list-item-group>

    </v-navigation-drawer>
</template>

<script setup lang='ts'>
import { ref, defineEmits } from 'vue';

const emit = defineEmits(['toggle-drawer']);

const toggleDrawer = () => {
    emit('toggle-drawer');
}

const routes = [
    {
        name: 'Home',
        path: '/',
        icon: 'mdi-home-outline'
    },
    {
        name: 'Synth',
        path: '/synth',
        icon: 'mdi-piano'
    },
    {
        name: 'Tea',
        path: '/tea',
        icon: 'mdi-kettle-steam-outline'
    }
]

</script>

<style scoped lang="scss">
.v-list-item {
    display:flex;
    margin:15px;
    padding-left: 5px;
    padding-top: 10px;
    color: rgb(var(--v-theme-primary));

    &--active {
        .v-list-item-title {
            border-bottom: rgb(var(--v-theme-primary)) 2px solid;
        }
    }

    div {
        display: inherit;
    }

    .v-icon {
        color: rgb(var(--v-theme-primary));
        align-items: center;
        padding: 10px;
        margin-right: 10px;
        font-size: 2.2rem;
        margin-top: -5px;
        margin-bottom: 5px;
    }

    &-title {
        color: rgb(var(--v-theme-on-background));
        font-size: 2rem;
        padding-top: 10px;
        padding-bottom: 0px;
    }
}

</style>