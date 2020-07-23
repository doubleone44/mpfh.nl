<template>
<div>
    <navigation />
     <div id="main" class="synth">
    
        <div class="container bg-black">
            <div class="row">
                <div class="col-12">
                    <h2>Envelope</h2>
                </div>
                <div class="col">
                    <p>Attack <input 
                    type="range" 
                    name="attack"
                    min="0.01" step="0.01" max="0.5"
                    v-model="voice.envelope.attack"
                    /> {{voice.envelope.attack}}</p>
                </div>
                <div class="col">
                    <p>Decay <input 
                    type="range" 
                    name="decay"
                    min="0.01" step="0.01" max="1"
                    v-model="voice.envelope.decay"
                    /> {{voice.envelope.decay}}</p>
                </div>
                <div class="col">
                    <p>Sustain <input 
                    type="range" 
                    name="sustain"
                    min="0.01" step="0.01" max="1"
                    v-model="voice.envelope.sustain"
                    /> {{voice.envelope.sustain}}</p>
                </div>
                <div class="col">
                    <p>Release <input 
                    type="range" 
                    name="release"
                    min="0.01" step="0.01" max="1"
                    v-model="voice.envelope.release"
                    /> {{voice.envelope.release}}</p>
                </div>
            </div>
            <div class="row">
                <div class="col-12">
                    <h2>Modulation</h2>
                </div>
                <div class="col">
                    <p>Harmonicity <input 
                    type="range" 
                    name="harmonicity"
                    min="0" step="0.5" max="20"
                    v-model="voice.harmonicity"
                    /> {{voice.harmonicity}}</p>
                </div>
                <div class="col">
                    <p>Detune <input 
                    type="range" 
                    name="detune"
                    min="-50" step="5" max="50"
                    v-model="voice.detune"
                    />  {{voice.detune}} </p>
                </div>
            </div>
            <div class="row">
                <div class="col-12">
                    <h2>Partials</h2>
                </div>
                <div class="col">
                    <p>Bandwidth<input 
                    type="range" 
                    name="bandwidth"
                    min="0" step="0.01" max="1"
                    v-model="partialGen.bandwidth"
                    />{{partialGen.bandwidth}}</p>
                </div>
                <div class="col">
                    <p>Harmonics<input 
                    type="range" 
                    name="harmonics"
                    min="0" step="0.01" max="1"
                    v-model="partialGen.harmonics"
                    />{{partialGen.harmonics}}</p>
                </div>
                <div class="col">
                    <p>Scale<input 
                    type="range" 
                    name="scale1"
                    min="0" step="1" max="20"
                    v-model="partialGen.scale1"
                    />
                    <input 
                    type="range" 
                    name="scale2"
                    min="0" step="1" max="20"
                    v-model="partialGen.scale2"
                    />
                    {{partialGen.scale1}}/{{partialGen.scale2}}</p>
                </div>
                <div class="col">
                    <p>Damp<input 
                    type="range" 
                    name="harmonics"
                    min="0" step="0.01" max="1"
                    v-model="partialGen.damp"
                    />{{partialGen.damp}}</p>
                </div>
            </div>
            <div class="row">
                <div class="col-8">
                    <canvas id="waveform" style="width: 100%" ></canvas>
                </div>
                <div class="col-4" style="line-height: 0">
                    <input 
                    v-for="(p, i) in voice.oscillator.partials"
                    v-bind:key="i"
                    type="range" 
                    name="harmonics"
                    min="0" step="0.01" max="1"
                    v-model="voice.oscillator.partials[i]"
                    />     
                </div>
            </div>
            
        </div>
    </div>
</div>
</template>

<script lang='ts'>

import { Vue, Component, Prop, Watch, Mixins } from "vue-property-decorator";
import Navigation from "@/components/Navigation.vue"

//@ts-ignore
import { Synth, FMSynth, AMSynth, PolySynth, Analyser, Context } from "tone";


@Component({
    components: {
        Navigation
    }
})
export default class SynthPage extends Mixins(){
    partialGen = {
        bandwidth: "0.1",
        damp: "0.1",
        harmonics: "0.1",
        scale1: "1",
        scale2: "1"
    }

    voice = {
        envelope: {
            attack: 0.02,
            decay: 0.5,
            sustain: 0.5,
            release: 0.4,
        },
        harmonicity: 0,
        modulationIndex: 10,
        detune : 0,
        oscillator: {
            type: "custom",
            partials: [1,0]
        },
        modulation: {
            type: "square",
            partialCount: 3
        } ,
        modulationEnvelope: {
            attack: 0.2,
            decay: 0,
            sustain: 1,
            release: 0.8
        }
    };

    keyboardMap = {
        "a": "C4",
            "w": "C#4",
        "s": "D4",
            "e": "D#4",
        "d": "E4",
        "f": "F4",
            "t": "F#4",
        "g": "G4",
            "y": "G#4",
        "h": "A4",
            "u": "A#4",
        "j": "B4",
        "k": "C5",
            "o": "C#5",
        "l": "D5",
    }

    volume = 0.5;

    poly = new PolySynth(12, AMSynth, this.voice
    ).toMaster();

    analyser = new Analyser("waveform");
    canvas = null as any;
    canvasCtx = null as any;

    getFreq(m: any) {
        return (2**((m - 69)/12))*(440);
    }

    @Watch("voice", {deep: true})
    changeVoice(val: any) {
        //console.log("change!")
        this.poly.set(this.voice);
    }

    @Watch("partialGen", {deep: true})
    genPartials(val: any) {
        let h = parseFloat(this.partialGen.harmonics)
        let b = parseFloat(this.partialGen.bandwidth)
        let d = parseFloat(this.partialGen.damp)
        let s1 = parseFloat(this.partialGen.scale1)
        let s2 = parseFloat(this.partialGen.scale2)
        let s = s1/s2


        var partials = [1];
        for(var i = 1; i < 64; i++) { 
            let v = (1.1**(-i*d))*(h/i)* (2*Math.abs(0.5*s - i % s)/s)**(b*10)
            v = v > 0 ? v : 0
            v = v > 1 ? 1 : v
            partials.push(v)
        }
        this.voice.oscillator.partials = partials
    }


    getMIDIMessage(message: any) {
        var command = message.data[0];
        var note = message.data[1];
        var velocity = (message.data.length > 2) ? message.data[2] : 0; // a velocity value might not be included with a noteOff command
        var f = this.getFreq(note);
        var v = velocity / 127;

        switch (command) {
            case 144: // noteOn
                if (velocity > 0) {
                    ////console.log(note, velocity);
                    this.poly.triggerAttack(f, Context.currentTime, v);

                } else {
                    ////console.log(note);
                    this.poly.triggerRelease(f);
                }
                break;
            case 128: // noteOff
                ////console.log(note);
                this.poly.triggerRelease(f);
                break;
            // we could easily expand this switch statement to cover other types of commands such as controllers or sysex
        }
    }

    onMIDISuccess(midiAccess: any) {
        for (var input of midiAccess.inputs.values())
            input.onmidimessage = this.getMIDIMessage;
    }

    makeAnalyser() {
        this.poly.connect(this.analyser);
        this.analyser.toMaster();

        var WIDTH = this.canvas.width;
        var HEIGHT = this.canvas.height;

        this.canvasCtx.clearRect(0, 0, WIDTH, HEIGHT);
    
    }

    draw() {
        var WIDTH = this.canvas.width;
        var HEIGHT = this.canvas.height;

        var drawVisual = window.requestAnimationFrame(this.draw);
        
        this.analyser.size = 1024
        var dataArray = this.analyser.getValue()

        // var index = dataArray.reduce(function(l_i: any, val: any, i: any) { 
        //     val[l_i+1] - val[l_i+1] < val[i+1] - val[i] ? i : l_i 
        // )
        var index = dataArray.findIndex((x: any, a: any) => (Math.abs(x) < 0.01 && dataArray[a+1] > x && dataArray[a+10] > 10*x))
        if(index > 0) {
            dataArray = dataArray.slice(index)
        }

        this.canvasCtx.fillStyle = 'rgb(26, 26, 26)';
        this.canvasCtx.fillRect(0, 0, WIDTH, HEIGHT);
        this.canvasCtx.lineWidth = 2;
        this.canvasCtx.strokeStyle = 'rgb(84, 167, 158)';
        this.canvasCtx.beginPath();
        var sliceWidth = WIDTH * 1.0 / 256;
        var x = 0;
        for(var i = 0; i < 256; i++) {
    
            var v = -dataArray[i]*2 + 0.5;
            var y = v * HEIGHT;

            if(i === 0) {
            this.canvasCtx.moveTo(x, y);
            } else {
            this.canvasCtx.lineTo(x, y);
            }

            x += sliceWidth;
        }
        this.canvasCtx.stroke();
    }

    KeyboardEntry(key: string, down: boolean) {
        //@ts-ignore
        //console.log(key, down);
        let note = this.keyboardMap[key];
        if(note != null ){
            if(down) {
                this.poly.triggerAttack(note, Context.currentTime, this.volume)
            }
            else 
            {
                try {
                    this.poly.triggerRelease(note)
                }
                catch {
                    this.poly.triggerRelease(note)
                }
                
            }
        }
        
    }
    
    mounted() {
        let keysdown = {};

        window.addEventListener("keydown", (event: any) => {
            if(event.repeat) { return; }
            this.KeyboardEntry(event.key, true);
        }, true);

        window.addEventListener("keyup", (event: any) => { 
            this.KeyboardEntry(event.key, false);
        }, true);


        this.canvas = document.getElementById("waveform")!;
        this.canvasCtx = this.canvas.getContext('2d')!;

        //console.log(this.poly)

        this.makeAnalyser();
        this.draw();

         //@ts-ignore
        navigator.requestMIDIAccess()
        .then(this.onMIDISuccess);

    }

}
</script>

<style lang="scss">

@import "@/assets/styles/_variables.scss";

#main.synth {
  padding-top: 200px;
}

input {
    -webkit-appearance: none;  /* Override default CSS styles */
    appearance: none;
    width: 100%;
    height: 25px;
    background-color: $darkblue;
    outline: none;
    opacity: 0.7;
    -webkit-transition: .2s; 
    transition: opacity .2s;
    border: none;
    color: $pastel1
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
    background: $pastel1; /* Green background */
    cursor: pointer; /* Cursor on hover */
}

input::-moz-range-thumb {
    width: 25px; /* Set a specific slider handle width */
    height: 25px; /* Slider handle height */
    border-radius: 0px;
    border: none;
    background: $pastel1; /* Green background */
    cursor: pointer; /* Cursor on hover */
}



</style> 