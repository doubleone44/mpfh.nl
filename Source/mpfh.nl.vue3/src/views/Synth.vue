<template>
    
    <!-- tabs for Overtones, Envelope, and Tuning -->
    <v-card>
        <p>me first</p>
        <v-tabs v-model="tab">
            <v-tab value="overtones">Overtones</v-tab>
            <v-tab value="envelope">Envelope</v-tab>
            <v-tab value="tuning">Tuning</v-tab>
        </v-tabs>

        <v-window v-model="tab">
            <v-window-item  value="overtones">
                test
                <!-- <Overtones :params="synthParams.overtones" /> -->
            </v-window-item >
            <v-window-item  value="envelope">
                test
                <!-- <Envelope :params="synthParams.envelope" /> -->
            </v-window-item >
            <v-window-item  value="tuning">
                test
                <!-- <Tuning :params="synthParams.tuning" /> -->
            </v-window-item >
        </v-window>
    </v-card>

    <!-- tab content -->
    
</template>

<script setup lang='ts'>

import { ref} from 'vue'

import type { OvertoneParameters } from '../synth/overtones'
import type { EnvelopeParameters } from '../synth/envelope'
import type { TuningParameters } from '../synth/tuning'

import { triangleParams } from '../synth/preset_waves'
import { _12TET } from '../synth/tuning'

import { inverse_decay_func } from '../synth/overtones'

import Overtones from '../components/synth/Overtones.vue'
import Envelope from '../components/synth/Envelope.vue'
import Tuning from '../components/synth/Tuning.vue'

const props = defineProps<{
    tab: null | number,

    overtones: OvertoneParameters,
    envelope: EnvelopeParameters,
    tuning: TuningParameters
}>()

// define the tab state
const tab = ref(0)

type SynthParams = {
    overtones: OvertoneParameters,
    envelope: EnvelopeParameters,
    tuning: TuningParameters
}

// define the params for the synth
let synthParams: SynthParams = {
    overtones: triangleParams,
    envelope: {
        attack: 0.9,
        decay: 0.1,
        sustain: 0.5,
        release: 0.1
    },
    tuning: _12TET
} 

</script>
  