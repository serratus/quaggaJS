export  function nextSet(line, offset) {
    var i;

    offset = offset || 0;
    for (i = offset; i < line.length; i++) {
        if (line[i]) {
            return i;
        }
    }
    return line.length;
};

export function normalize(counter, modulo) {
    var i,
        sum = 0,
        ratio,
        numOnes = 0,
        normalized = [],
        norm = 0;

    for (i = 0; i < counter.length; i++) {
        if (counter[i] === 1) {
            numOnes++;
        } else {
            sum += counter[i];
        }
    }
    ratio = sum / (modulo - numOnes);
    if (ratio > 1.0) {
        for (i = 0; i < counter.length; i++) {
            norm = counter[i] === 1 ? counter[i] : counter[i] / ratio;
            normalized.push(norm);
        }
    } else {
        ratio = (sum + numOnes) / modulo;
        for (i = 0; i < counter.length; i++) {
            norm = counter[i] / ratio;
            normalized.push(norm);
        }
    }
    return normalized;
}

export function matchPattern(counter, code, modulo, maxSingleError=1) {
    var i,
        error = 0,
        singleError = 0;

    for (i = 0; i < counter.length; i++) {
        singleError = Math.abs(code[i] - counter[i]);
        if (singleError > maxSingleError) {
            return Number.MAX_VALUE;
        }
        error += singleError;
    }
    return error / modulo;
}

export function findPattern(row, pattern, {
        offset,
        isWhite=false,
        tryHarder=true,
        epsilon=0.5,
        maxSingleError=0.5,
        modulo}) {
    var counter = [],
        i,
        counterPos = 0,
        bestMatch = {
            error: Number.MAX_VALUE,
            code: -1,
            start: 0,
            end: 0
        },
        error,
        j,
        sum,
        normalized;

    if (!offset) {
        offset = nextSet(row);
    }

    for ( i = 0; i < pattern.length; i++) {
        counter[i] = 0;
    }

    for ( i = offset; i < row.length; i++) {
        if (row[i] ^ isWhite) {
            counter[counterPos]++;
        } else {
            if (counterPos === counter.length - 1) {
                sum = 0;
                for ( j = 0; j < counter.length; j++) {
                    sum += counter[j];
                }
                normalized = normalize(counter, modulo);
                if (normalized) {
                    error = matchPattern(normalized, pattern, modulo, maxSingleError);

                    if (error < epsilon) {
                        bestMatch.error = error;
                        bestMatch.start = i - sum;
                        bestMatch.end = i;
                        return bestMatch;
                    }
                }
                if (tryHarder) {
                    for ( j = 0; j < counter.length - 2; j++) {
                        counter[j] = counter[j + 2];
                    }
                    counter[counter.length - 2] = 0;
                    counter[counter.length - 1] = 0;
                    counterPos--;
                } else {
                    return null;
                }
            } else {
                counterPos++;
            }
            counter[counterPos] = 1;
            isWhite = !isWhite;
        }
    }
    return null;
}
