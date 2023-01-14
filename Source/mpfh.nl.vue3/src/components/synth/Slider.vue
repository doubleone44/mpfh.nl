<template>
    <div>
        <p class="label">{{ label }}</p>
        <input
            v-model="value"
            :min="min" :max="max"
            :step="smooth_v ? 0.001 : step"
            type="range" 
        />
        <input v-if="smooth_switch" type="checkbox" v-model="smooth_v" />
        <p class="value">{{ 
            percentage ? 
            Math.floor(value*1000)/10 + '%' : 
            Math.floor(value*100)/100
        }}</p>
    </div>

</template>

<script setup lang='ts'>

import { ref, watch, defineProps } from 'vue'

const props = defineProps<{
    label: string,
    modelValue: number,
    min: number,
    max: number,
    step: number,
    smooth_switch: boolean,
    percentage: boolean,
}>()

const emits = defineEmits(['update:modelValue'])

const label = ref(props.label)
const value = ref(props.modelValue)
const min = ref(props.min)
const max = ref(props.max)
const step = ref(props.step)

const smooth_switch = ref(props.smooth_switch)
const percentage = ref(props.percentage)

// Maybe this is a better way to do it?
watch(value, (newValue: number) => {
    emits('update:modelValue', Number(newValue))
});


let smooth_v = false

</script>


<style scoped lang="scss">
.label {
    color: rgb(var(--v-theme-primary));
}

.value {
    color: rgb(var(--v-theme-primary));
    margin-top: -5px;
    margin-left: 5px;
    font-size: 1.25rem
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

input[type='checkbox'] {
    width: 25px;

    &:checked {
        background: rgb(var(--v-theme-primary))
    }
}

input[type='range'] {
    margin-right: 5px;
    width: calc(100% - 30px); 
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
