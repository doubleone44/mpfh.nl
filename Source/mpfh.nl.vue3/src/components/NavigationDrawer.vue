<template>
    <v-navigation-drawer app
        color="background"
    >

    </v-navigation-drawer>
</template>

<script setup lang='ts'>
import { ref, defineEmits } from 'vue';

const emit = defineEmits(['toggle-drawer']);

const toggleDrawer = () => {
    emit('toggle-drawer');
}

</script>