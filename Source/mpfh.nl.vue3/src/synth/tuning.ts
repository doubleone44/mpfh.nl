export type TuningParameters = {
    offset: number
    ratio_type: "single" | "absolute" | "relative"
    ratio: number | number[]
    tones_per_scale: number
    exponent_per_scale: number
    base_frequency: number
}

export function processParametersToTuning(
    p: TuningParameters,
    middle_note: number,
    note_count: number
) {
    let tuning = new Float32Array(note_count);

    let base_frequency = p.base_frequency;
    let offset = p.offset;
    let ratio = p.ratio;
    let ratio_type = p.ratio_type;
    let tones_per_scale = p.tones_per_scale;
    let exponent_per_scale = p.exponent_per_scale;

    let scale = 1;
    let scale_index = 0;

    for (let i = 0; i < note_count; i++) {
        let note = i - middle_note;
        let tone = (note + 10*tones_per_scale) % tones_per_scale;
        let scale = Math.pow(exponent_per_scale, Math.floor(note / tones_per_scale));

        let frequency = base_frequency;
        if (ratio_type == "single") {
            
            frequency *= Math.pow(exponent_per_scale, tone * <number>ratio);
        } else if (ratio_type == "absolute") {
            frequency *= (<number[]>ratio)[tone];
        } else if (ratio_type == "relative") {
            // relative ratios are relative to the previous tone
            if (tone == 0) {
                frequency *= (<number[]>ratio)[tone];
            } else {
                frequency *= tuning[i-1] * (<number[]>ratio)[tone]
            };
        };
        frequency *= scale;
        tuning[i] = frequency;
    };
    return tuning;
}