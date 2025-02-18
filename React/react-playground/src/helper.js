function genTicket(n) {
    if (!Number.isInteger(n) || n <= 0) {
        throw new Error('Number of tickets must be a positive integer');
    }
    
    return Array.from(
        { length: n }, 
        () => Math.floor(Math.random() * 10)
    );
}

function sum(arr) {
    if (!Array.isArray(arr)) {
        throw new Error('Input must be an array');
    }
    
    return arr.reduce((sum, curr) => {
        if (typeof curr !== 'number') {
            throw new Error('Array must contain only numbers');
        }
        return sum + curr;
    }, 0);
}

export { genTicket, sum };