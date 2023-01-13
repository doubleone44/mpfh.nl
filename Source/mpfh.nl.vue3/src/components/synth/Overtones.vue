<template>
    <input
        v-model="params.scale"
        min="0" max="8"
        :step="smooth.scale ? 0.001 : 1"
        type="range" 
    />
    <input type="checkbox" v-model="smooth.scale"
    />
    {{ Math.floor(params.scale*1000)/10 }}%
</template>

<script setup lang='ts'>

import type { OvertoneParameters }  from '@/synth/overtones';

import { ref, defineProps } from 'vue'

const props = defineProps<{
    params: OvertoneParameters,
    smooth: {
        scale: boolean,
    }
}>()

const params = ref(props.params)
const smooth = {
    scale: false
}

</script>



<style scoped lang="scss">

input[type='checkbox'] {
    width: 25px;

    &:checked {
        background: rgb(var(--v-theme-primary))
    }
}

input {
    -webkit-appearance: none;  /* Override default CSS styles */
    appearance: none;
    width: 100%;
    height: 25px;
    background-color: rgb(var(--v-theme-surface-variant));
    outline: none;
    opacity: 0.7;
    -webkit-transition: .2s; 
    transition: opacity .2s;
    border: none;
    color: rgb(var(--v-theme-primary))
}

input:hover {
    opacity: 1; 
}

input::-webkit-slider-thumb {
    -webkit-appearance: none; /* Override default look */
    appearance: none;
    width: 25px; /* Set a specific slider handle width */
    height: 25px; /* Slider handle height */
    border-radius: 0px;
    border: none;
    background: rgb(var(--v-theme-primary)); /* Green background */
    cursor: pointer; /* Cursor on hover */
}

input::-moz-range-thumb {
    width: 25px; /* Set a specific slider handle width */
    height: 25px; /* Slider handle height */
    border-radius: 0px;
    border: none;
    background: rgb(var(--v-theme-primary)); /* Green background */
    cursor: pointer; /* Cursor on hover */
}
</style>
