import { scale_func, binomial_spread } from "./math_helper"

export type OvertoneParameters = {
    drive: number // real number on [0,->)

    overtone_resolution: number
    overtone_count: number

    scale_strength: number // real number on [0,1]
    scale: number // real number on [0,->)
    scale_shift: number // real number on [0,1]
    
    choral_width_a: number
    choral_width_b: number
    choral_width_c: number

    choral_asymmetry_a: number
    choral_asymmetry_b: number
    choral_asymmetry_c: number

    overtone_decay_function: (args: any) => (overtone: number) => number
    overtone_decay_args: any
    wobble: boolean

}

export var wobble_func = (scale: number) => {
    return (overtone: number) => {
        return Math.pow(-1, Math.floor(overtone / scale))
    }
}

export var inverse_decay_func = (base: number) => {
    return (overtone: number) => {
        return 1/Math.pow(overtone, base);
    }
}

export var exponential_decay_func = (base: number) => {
    return (overtone: number) => {
        return Math.pow(base, -overtone);
    }
}

export var quadratic_offset_func = (a: number, b: number, c: number) => {
    return (x: number) => {
        return a*x*x + b*x + c;
    }
}

export function processParametersToWave(ctx: AudioContext, p: OvertoneParameters) { 
    let overtone_res = Math.pow(2,p.overtone_resolution)

    let N = (p.overtone_count+1) * overtone_res;
    let frequencyDomain = new Float32Array(N);

    let wobble_f = wobble_func(p.scale)
    let choral_asymmetry_f = quadratic_offset_func(p.choral_asymmetry_a, p.choral_asymmetry_b, p.choral_asymmetry_c)
    let choral_width_f = quadratic_offset_func(p.choral_width_a, p.choral_width_b, p.choral_width_c)
    let overtone_decay_f = p.overtone_decay_function(p.overtone_decay_args)
    // The first overtone is the root frequency.
    // The second overtone is the first harmonic.
    // Etc.
    for (let overtone = 1; overtone <= p.overtone_count+1; overtone++) {
        let i = overtone * overtone_res;

        // for overtone scaling, triangle waves etc.
        let min_s = 1 - p.scale_strength;
        let s_factor = Math.max(min_s, scale_func(overtone, p.scale, p.scale_shift));

        // bound choral asymmetry between -0.9 and 0.9
        let choral_asymmetry = Math.max(Math.min(choral_asymmetry_f(overtone), 0.9), -0.9);
        let choral_width = Math.min(choral_width_f(overtone), overtone_res-1);
        let ceil_width = Math.ceil(choral_width);
        
        let overtone_decay = overtone_decay_f(overtone);

        if (p.wobble && p.scale > 0) {
            let wobble = wobble_f(overtone);
            overtone_decay *= wobble;
        }

        let ampl = s_factor * overtone_decay;

        // for loop between overtone-choral_width and overtone+choral_width
        if (ceil_width == 0) {
            frequencyDomain[i] = ampl * (1+p.drive);
        } else {
            for (let j = i - ceil_width; j <= i + ceil_width; j++) {
                let choral_ampl = binomial_spread(ceil_width, choral_width, choral_asymmetry/2+1)(j-i)
                frequencyDomain[j] = ampl * choral_ampl * (1+p.drive);
            }
        }

        
    }

    return ctx.createPeriodicWave(frequencyDomain, new Float32Array(N));
}