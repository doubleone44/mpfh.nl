// We define a new AudioProcessor class that extends the AudioWorkletProcessor class.
// Containing all logic for the audio processing. 
// Using this we can define new AudioNode instances dynamically.
// The 

import { AudioWorkletProcessor } from '@types/webaudioapi';

// Parameters contains the parameters that are defined in the parameterDescriptors
type Parameters = {
    root_frequency: Float32Array[]
    function: (overtone: number, ...args: number[]) => number
    params: number[]
}

let sampleRate: number = 44100;

// unscaled FFT implementation.
// FFT size is 2048 samples with 64 per overtone for a total of 31 overtones possible (last one unusable)
// The first overtone is the root frequency.
// The second overtone is the first harmonic.
// Etc.
// Thus is the root frequency is 440Hz, the very next sample is 
function FFT(input: Float32Array, output: Float32Array) {
    let N = input.length;
    let N2 = N / 2;

    for (let k = 0; k < N2; k++) {
        let real = 0;
        let imag = 0;

        for (let n = 0; n < N; n++) {
            let angle = 2 * Math.PI * k * n / N;
            real += input[n] * Math.cos(angle);
            imag += -input[n] * Math.sin(angle);
        }

        output[k] = Math.sqrt(real * real + imag * imag);
    }
}

// This function "time stretches" the FFT output to the relevant frequency. Given that the root frequency is at 8 over 2048 samples.
scale_FFT = (FFT_output: Float32Array, root_frequency: number) => {
    null
}

class DynamicOscilatorProcessor extends AudioWorkletProcessor {
    currentTime: number = 0;

    static get parameterDescriptors() {
        return [{
            name: 'base_frequency',
            defaultValue: 440,
            minValue: 0,
            maxValue: sampleRate / 2
        }];
    }

    // The ouput array is a block of (usually 128) samples for each channel.
    // Each sample is an instance of length 1/sampleRate, thus a block of 128 samples is 128/sampleRate seconds long.
    process(inputs: Float32Array[][], 
            outputs: Float32Array[][], 
            parameters: Parameters) {

        const output = outputs[0];

        for (let channel = 0; channel < output.length; ++channel) {

            for (let i = 0; i < output[channel].length; ++i) {
                let time = this.currentTime + i / sampleRate;

                output[channel][i] = Math.sin(2 * Math.PI * parameters.root_frequency[channel][i] * time);
            }
        }

        this.currentTime += output[0].length / sampleRate;

        return true;



    }
}