// We define a new AudioProcessor class that extends the AudioWorkletProcessor class.
// Containing all logic for the audio processing. 
// Using this we can define new AudioNode instances dynamically.
// The 

import { AudioWorkletProcessor } from '@types/webaudioapi';

// Parameters contains the parameters that are defined in the parameterDescriptors
type Parameters = {
    frequency: Float32Array[]
    function: 
}



let sampleRate: number = 44100;

class DynamicOscilatorProcessor extends AudioWorkletProcessor {
    static get parameterDescriptors() {
        return [{
            name: 'frequency',
            defaultValue: 440,
            minValue: 0,
            maxValue: sampleRate / 2
        }];
    }

    process(inputs: Float32Array[][], 
            outputs: Float32Array[][], 
            parameters: Parameters) {
        const output = outputs[0];

        for (let channel = 0; channel < output.length; ++channel) {
            for (let i = 0; i < output[channel].length; ++i) {
                output[channel][i] = Math.sin(2 * Math.PI * parameters.frequency[channel][i] * this.currentTime);
            }
        }

        return true;



    }
}