// Test file with various code issues
const API_KEY = "sk-1234567890abcdef"; // Hardcoded secret
var shouldBeConst = "bad practice"; // Should use const

function tooManyParams(a, b, c, d, e, f, g) {
    if (a > 0) {
        if (b > 0) {
            if (c > 0) {
                if (d > 0) {
                    console.log("Too much nesting!");
                    eval("dangerous()"); // Security issue
                    document.innerHTML = userInput; // XSS vulnerability
                }
            }
        }
    }
    return 42; // Magic number
}

const unusedVariable = "I'm never used";

// Complexity issues
function complexFunction() {
    let result = 0;
    for (let i = 0; i < 100; i++) {
        if (i % 2 === 0) {
            if (i % 4 === 0) {
                if (i % 8 === 0) {
                    result += i;
                } else {
                    result -= i;
                }
            } else {
                result *= 2;
            }
        } else {
            if (i % 3 === 0) {
                result /= 2;
            } else {
                result += 10;
            }
        }
    }
    return result;
}
