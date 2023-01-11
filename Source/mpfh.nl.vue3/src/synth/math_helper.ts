function gamma(z: number) {
    return Math.sqrt(2 * Math.PI / z) * Math.pow((1 / Math.E) * (z + 1 / (12 * z - 1 / (10 * z))), z)
}

function factorial(z: number) {
    return gamma(z + 1)
}

function binomial(k: number, n: number, p: number) {
    return factorial(n) / (factorial(k) * factorial(n - k)) * Math.pow(p, k) * Math.pow(1 - p, n - k)
}

export function scale_func(overtone: number, scale: number, shift: number) {
    return 2 * Math.abs(0.5 * scale - (overtone - shift*scale) % scale) / scale;
}

export function binomial_spread(width: number, asym: number) {
    let n = width * 2 + 1;

    let p = (1+asym) / 2;
    
    return (i: number) => {
        return binomial(i+width, n, p);
    }
}