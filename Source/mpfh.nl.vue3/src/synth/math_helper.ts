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
    if (scale == 0) {
        return 1;
    }
    return (2 * Math.abs(0.5 * scale - Math.abs(overtone + (scale*shift/2)) % scale) / scale)**2;
}

export function binomial_spread(ceil_width: number, width: number, asym: number) {
    let n = width * 2;

    let p = (1+asym) / 2;
    
    return (i: number) => {
        return binomial(i+ceil_width, n, p);
    }
}