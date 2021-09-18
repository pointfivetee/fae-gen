// Randomly pick an item from a list, attempting to avoid items that have previously been picked
const RETRIES = 5;
let picks = [];
export function pickRandom(arr) {
    let i = 0;
    while (i < RETRIES) {
        let pick = arr[Math.floor(Math.random() * arr.length)];
        if (! picks.includes(pick)) {
            picks.push(pick);
            return pick;
        }
        i++;
    }
    let pick = arr[Math.floor(Math.random() * arr.length)];
    console.log(`<<retry limit reached: reusing item ${pick}>>`);
    return pick;
}

function resetPicks() {
    picks = [];
}

// String template magic
export function t(strings, ...tokens) {
    return function (context) {
        let result = [strings[0]];
        tokens.forEach(function(token, i) {
            let value = token instanceof Array ? token : context[token];
            result.push(value instanceof Function ? value() : value instanceof Array ? pickRandom(value) : value, strings[i + 1]);
        });
        //console.log(result.join(""));
        return result.join("");
    }
}

// Die roller
export function rollD(n) {
    return Math.floor(Math.random()*n)+1;
}

console.log('utils');