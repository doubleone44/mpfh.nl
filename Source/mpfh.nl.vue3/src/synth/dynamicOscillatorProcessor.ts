// We define a new AudioProcessor class that extends the AudioWorkletProcessor class.
// Containing all logic for the audio processing. 
// Using this we can define new AudioNode instances dynamically.

// This will be a dynamic variable, depending on the sample rate of the audio context.
let sampleRate: number = 44100;


// Parameters contains the parameters that are defined in the parameterDescriptors
type Parameters = {
    root_frequency: Float32Array[]
    function: (overtone: number, ...args: number[]) => number
    params: number[]
}

class DynamicOscilatorProcessor extends AudioWorkletProcessor {
    root_frequency: number = 440;

    n_overtones: number = 31;
    overtone_resolution: number = 64;
    N: number = 2*(this.n_overtones+1) * this.overtone_resolution;
    
    frequencyDomain = new Float32Array(this.N);
    timeDomain = new Float32Array(this.N);

    currentTime: number = 0;

    fft_frequency = sampleRate/this.N*this.overtone_resolution;
    ratio = this.root_frequency/this.fft_frequency;


    stretched_array: Float32Array = new Float32Array(this.N);

    

    static get parameterDescriptors() {
        return [{
            name: 'root_frequency',
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



export {};
