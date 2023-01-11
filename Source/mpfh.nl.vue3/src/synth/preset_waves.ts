import type { OvertoneParameters } from "./overtones";
import { inverse_decay_func } from "./overtones";

export var triangleParams: OvertoneParameters = {
    drive: 1,

    overtone_count: 8,
    overtone_resolution: 1,
    
    scale_strength: 1,
    scale: 1,
    scale_shift: 1,
    
    choral_width_a: 0,
    choral_width_b: 0,
    choral_width_c: 0,

    choral_asymmetry_a: 0,
    choral_asymmetry_b: 0,
    choral_asymmetry_c: 0,

    overtone_decay_function: inverse_decay_func,
    overtone_decay_args: 2,

    wobble: true
}

export var squareParams: OvertoneParameters = {
    drive: 1,

    overtone_count: 8,
    overtone_resolution: 1,

    scale_strength: 1,
    scale: 1,
    scale_shift: 1,

    choral_width_a: 0,
    choral_width_b: 0,
    choral_width_c: 0,

    choral_asymmetry_a: 0,
    choral_asymmetry_b: 0,
    choral_asymmetry_c: 0,

    overtone_decay_function: inverse_decay_func,
    overtone_decay_args: 1,

    wobble: true
}

export var sawtoothParams: OvertoneParameters = {
    drive: 1,

    overtone_count: 8,
    overtone_resolution: 1,

    scale_strength: 1,
    scale: 0,
    scale_shift: 0,
    
    choral_width_a: 0,
    choral_width_b: 0,
    choral_width_c: 0,

    choral_asymmetry_a: 0,
    choral_asymmetry_b: 0,
    choral_asymmetry_c: 0,

    overtone_decay_function: inverse_decay_func,
    overtone_decay_args: 1,

    wobble: false
}
