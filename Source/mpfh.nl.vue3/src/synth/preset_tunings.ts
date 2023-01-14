import type { TuningParameters } from "src/synth/tuning"

export var _12TET: TuningParameters = {
    offset: 0,
    ratio: 1/12,
    ratio_type: "single",
    tones_per_scale: 12,
    exponent_per_scale: 2,
    base_frequency: 440
}

export var _12pyth: TuningParameters = {
    offset: 0,
    ratio: [1, 256/243, 9/8, 32/27, 81/64, 4/3, 729/512, 3/2, 128/81, 27/16, 16/9, 243/128],
    ratio_type: "absolute",
    tones_per_scale: 12,
    exponent_per_scale: 2,
    base_frequency: 440
}

export var _19EDO: TuningParameters = {
    offset: 0,
    ratio: 1/19,
    ratio_type: "single",
    tones_per_scale: 19,
    exponent_per_scale: 2,
    base_frequency: 440
}
