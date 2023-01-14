<template>
    <v-container>
        <!-- Overtone resolution & count -->
        <v-row>
            <v-col sm="4"
            class="elevation-2">
                <slider 
                    v-model="params.overtone_count"
                    label="Overtone count"
                    :min="1"
                    :max="16"
                    :step="1"
                    :smooth_switch="true"
                    :percentage="false"
                ></slider>
            </v-col>
            <v-col sm="4"
            class="elevation-2">
                <slider 
                    v-model="params.overtone_resolution"
                    label="Overtone resolution"
                    :min="1"
                    :max="8"
                    :step="1"
                    :smooth_switch="false"
                    :percentage="false"
                ></slider>
            </v-col>
        </v-row>
        <!-- Scale params -->
        <v-row>  
            <v-col sm="4"
            class="elevation-2">
                <slider 
                    v-model="params.scale"
                    label="Scale"
                    :min="1"
                    :max="8"
                    :step="1"
                    :smooth_switch="true"
                    :percentage="false"
                ></slider>
            </v-col>
            <v-col sm="4"
            class="elevation-2">
                <slider 
                    v-model="params.scale_shift"
                    label="Scale shift"
                    :min="0"
                    :max="1"
                    :step="0.01"
                    :smooth_switch="false"
                    :percentage="true"
                ></slider>
            </v-col>
            <v-col sm="4"
            class="elevation-2">
                <slider 
                    v-model="params.scale_strength"
                    label="Scale strength"
                    :min="0"
                    :max="1"
                    :step="0.01"
                    :smooth_switch="false"
                    :percentage="true"
                ></slider>
            </v-col>
        </v-row>
        
        <v-row>
            <v-col sm="4" class="elevation-2">
                <select 
                    v-model="params.overtone_decay_function"
                    label="Decay type"
                    :options="decay_options" >
                    <option v-for="option in decay_options" :value="option.value">
                        {{ option.label }}
                    </option>
                </select>
            </v-col>
            <v-col sm="4" class="elevation-2">
                <slider 
                    v-model="params.overtone_decay_args"
                    label="Decay scale"
                    :min="0.25"
                    :max="8"
                    :step="0.25"
                    :smooth_switch="true"
                    :percentage="false"
                ></slider>
            </v-col>
        </v-row>

        <!-- choral parameters -->
        <!-- <v-row>
            <v-col sm="4">
                <slider 
                    v-model="params.choral_width_a"
                    label="Choral width"
                    :min="0"
                    :max="0.1"
                    :step="0.01"
                    :smooth_switch="false"
                    :percentage="false"
                ></slider>
                <slider 
                    v-model="params.choral_width_b"
                    label=""
                    :min="0"
                    :max="1"
                    :step="0.01"
                    :smooth_switch="false"
                    :percentage="false"
                ></slider>
                <slider 
                    v-model="params.choral_width_c"
                    label=""
                    :min="0"
                    :max="10"
                    :step="1"
                    :smooth_switch="false"
                    :percentage="false"
                ></slider>
            </v-col>
            
        </v-row> -->
    </v-container>
    
</template>

<script setup lang='ts'>

import { ref, watch, defineProps, defineEmits } from 'vue'

import type { OvertoneParameters }  from '@/synth/overtones';
import { inverse_decay_func, exponential_decay_func } from '@/synth/overtones';

import slider from '@/components/synth/Slider.vue';

const props = defineProps<{
    params: OvertoneParameters,
}>()

const decay_options = [
    {value: inverse_decay_func, label: 'Inverse'},
    {value: exponential_decay_func, label: 'Exponential'},
]

const emits = defineEmits(['update:params'])

const params = ref(props.params)

watch(params, (newParams: OvertoneParameters) => {
    emits('update:params', newParams)
}, {deep: true} )

</script>


