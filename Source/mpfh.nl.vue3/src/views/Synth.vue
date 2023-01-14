<template>
    
    <v-container>
        <v-card>
            <v-btn @click="start()">
                <v-icon>mdi-play</v-icon>
            </v-btn>
        </v-card>
        <slider label="volume"
        v-model="volume" :min="0" :max="1" :step="0.01" 
        :smooth_switch="false"
        :percentage="false"
        />

        <v-card>
        <p>me first</p>
        <v-tabs v-model="tab">
            <v-tab value="overtones">Overtones</v-tab>
            <v-tab value="envelope">Envelope</v-tab>
            <v-tab value="tuning">Tuning</v-tab>
        </v-tabs>

        <v-window v-model="tab">
            <v-window-item value="overtones">
                <Overtones 
                    :params="overtones" 
                    @update:params="(params) => updateOvertones(params)" 
                />
            </v-window-item >
            <v-window-item value="envelope">
                <Envelope />
            </v-window-item >
            <v-window-item value="tuning">
                <Tuning />
            </v-window-item >
        </v-window>
    </v-card>
    </v-container>

    <!-- Bottom synthesizer -->

</template>

<script setup lang='ts'>

import { ref, reactive, toRaw, onMounted } from 'vue'
import type { Ref } from 'vue'

import type { OvertoneParameters } from '../synth/overtones'
import type { EnvelopeParameters } from '../synth/envelope'
import type { TuningParameters } from '../synth/tuning'

import { triangleParams, squareParams } from '../synth/preset_waves'
import { _12TET } from '../synth/preset_tunings'

import { processParametersToTuning } from '../synth/tuning'
import { processParametersToWave } from '../synth/overtones'

import Overtones from '../components/synth/Overtones.vue'
import Envelope from '../components/synth/Envelope.vue'
import Tuning from '../components/synth/Tuning.vue'
import Slider from '../components/synth/Slider.vue'

// define the tab state
const tab = ref(0)

// define the audio context
const ctx = new AudioContext()

// define the params for the synth
let volume: number = 0.5;

let overtones: OvertoneParameters = squareParams;
let envelope: EnvelopeParameters = {
    attack: 0.1,
    decay: 0.1,
    sustain: 0.5,
    release: 0.1,
};
let tuning: TuningParameters = _12TET;

// cached node properties
const num_osc = 127
let note_arr = processParametersToTuning(tuning, 70, num_osc)
console.log(note_arr)
let wave = processParametersToWave(ctx, overtones)
let osc_nodes: OscillatorNode[] = []
let gain_nodes: GainNode[] = []
let attackers: Set<number> = new Set()

function updateOvertones(val: OvertoneParameters) {
    let raw_value = toRaw(val)
    overtones = raw_value

    wave = processParametersToWave(ctx, overtones)
    osc_nodes.forEach((node, i) => { 
        node.setPeriodicWave(wave)
        node.frequency.setValueAtTime(note_arr[i]/Math.pow(2,overtones.overtone_resolution), ctx.currentTime);
    });
};

function updateEnvelope(val: EnvelopeParameters) {
    let raw_value = toRaw(val)
    envelope = raw_value
};

function updateTuning(val: TuningParameters) {
    let raw_value = toRaw(val)
    tuning = raw_value
};

function triggerAttack(node: number) {
    if (attackers.has(node)) {
        return
    } else {
        attackers.add(node)
    }

    // attack
    gain_nodes[node].gain.linearRampToValueAtTime(volume, ctx.currentTime + envelope.attack);
    // decay + sustain
    gain_nodes[node].gain.linearRampToValueAtTime(volume*envelope.sustain, ctx.currentTime + envelope.attack + envelope.decay);
}

function triggerRelease(node: number) {
    attackers.delete(node)
    // release

    let currentGain = gain_nodes[node].gain.value

    gain_nodes[node].gain.cancelScheduledValues(ctx.currentTime);
    gain_nodes[node].gain.setValueAtTime(currentGain, ctx.currentTime);
    gain_nodes[node].gain.linearRampToValueAtTime(0, ctx.currentTime + envelope.release);
}

let keyboardMap = {
    'z': 40, 'x': 41, 'c': 42, 'v': 43, 'b': 44, 'n': 45, 'm': 46, ',': 47, '.': 48, '/': 49,
    'a': 50, 's': 51, 'd': 52, 'f': 53, 'g': 54, 'h': 55, 'j': 56, 'k': 57, 'l': 58, ';': 59,
    'q': 60, 'w': 61, 'e': 62, 'r': 63, 't': 64, 'y': 65, 'u': 66, 'i': 67, 'o': 68, 'p': 69,
} 

type key = keyof typeof keyboardMap

function keyboardEntry(key: string, isDown: boolean) {
    if (isDown) {
        if (key == "Shift") {
            for (const [key, value] of Object.entries(keyboardMap)) {
                keyboardMap[key as key] = value + 12
            };
            console.log(keyboardMap);
            return;
        } else if (key == "Control") {
            for (const [key, value] of Object.entries(keyboardMap)) {
                keyboardMap[key as key] = value - 12
            };
            console.log(keyboardMap);
            return;
        } 
    }

    let key_ = key as key
    let note = keyboardMap[key_] as number | undefined

    if (note) {
        if (isDown) {
            triggerAttack(note%num_osc)
        } else {
            try {
                triggerRelease(note%num_osc)
            } catch {
                triggerRelease(note%num_osc)
            }
            
        }
    }
}

function initial_build_nodes() {
    for (let i = 0; i < num_osc; i++) {
        // osc_nodes
        let options = {
            frequency: note_arr[i],
            periodicWave: wave,
        }
        
        let osc_node = new OscillatorNode(ctx, options)
        osc_node.frequency.setValueAtTime(note_arr[i], ctx.currentTime); 
        osc_nodes.push(osc_node)

        // gain_nodes
        let gain_node = new GainNode(ctx, {gain: 0.0})
        gain_nodes.push(gain_node)

        // connect nodes
        osc_node.connect(gain_node)
        gain_node.connect(ctx.destination)
    }   
}

function start() {
    for (let i = 0; i < num_osc; i++) {
        osc_nodes[i].start()
    }
}

// when mounted
onMounted(() => {
    initial_build_nodes()

    window.addEventListener("keydown", (event: any) => {
        if(event.repeat) { return; }
        keyboardEntry(event.key, true);
    }, true);

    window.addEventListener("keyup", (event: any) => { 
        keyboardEntry(event.key, false);
    }, true);
})

</script>