// unscaled FFT implementation.
// FFT size is 2048 samples with 64 per overtone for a total of 31 overtones possible (last one unusable)
// The first overtone is the root frequency.
// The second overtone is the first harmonic.
// Etc.


export function FFT(input: Float32Array, real_output: Float32Array, imag_output: Float32Array) {
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

        real_output[k] = real;
        imag_output[k] = imag;

        real_output[N - k - 1] = real;
        imag_output[N - k - 1] = -imag;
    }
}

export function stretch_array(
    input: Float32Array, 
    frequency: number, 
    sampleRate: number, 
    overtone_resolution: number,
    ): Float32Array {
    
    let N = input.length;
    // thus, without stretching, the root_requency of the time domain is sampleRate/N*overtone_resolution
    let root_frequency = sampleRate/N*overtone_resolution;
    let ratio = frequency/root_frequency;

    // stretch the array using linear interpolation
    let oN = Math.floor(N*ratio);

    let output = new Float32Array(oN);

    for (let i = 0; i < oN; i++) {
        let index = i/ratio;
        let index0 = Math.floor(index);
        let index1 = Math.ceil(index);
        let alpha = index - index0;
        output[i] = input[index0] * (1-alpha) + input[index1] * alpha;
    }

    return output;
}






