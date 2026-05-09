// ============================================================
//  DEBUG FAULTY CODE — script.js
//  Covers: Syntax Errors, Runtime Errors, Fixes, Debugging
// ============================================================


// ─────────────────────────────────────────────────────────────
// SECTION 1 — SYNTAX ERRORS (Subtask 2.1)
// ─────────────────────────────────────────────────────────────

// ── Snippet 1 ── Missing closing parenthesis & wrong operator
// FAULTY:
//   function greetUser(name {          ← missing ')' in parameter list
//     console.log("Hello, " + name)    ← missing ';' (minor, but noted)
//   }
//   greetUser("Alice"                  ← missing closing ')'

// FIXED:
function greetUser(name) {
    return "Hello, " + name + "!";
}


// ── Snippet 2 ── Mismatched quotes and missing curly brace
// FAULTY:
//   function checkAge(age) {
//     if (age >= 18) {
//       console.log('You are an adult.")   ← mismatched quotes
//     else {                               ← missing closing '}' for if-block
//       console.log("You are a minor.");
//     }
//   }

// FIXED:
function checkAge(age) {
    if (age >= 18) {
        return "You are an adult.";
    } else {
        return "You are a minor.";
    }
}


// ── Snippet 3 ── Incorrect use of assignment (=) inside condition
// FAULTY:
//   if (x = 10) { ... }   ← should be '===' (comparison), not '=' (assignment)

// FIXED:
function isEqualToTen(x) {
    if (x === 10) {
        return "x equals 10.";
    }
    return "x does not equal 10.";
}


// ─────────────────────────────────────────────────────────────
// SECTION 2 — RUNTIME ERRORS (Subtask 2.2)
// ─────────────────────────────────────────────────────────────

// ── Snippet 4 ── TypeError: calling a non-function / undefined variable
// FAULTY:
//   let result = mutiply(4, 5);   ← typo: 'mutiply' is not defined → ReferenceError
//   function multiply(a, b) { return a * b; }

// FIXED (declare before use, correct spelling):
function multiply(a, b) {
    return a * b;
}


// ── Snippet 5 ── Division by zero (logical runtime issue)
// FAULTY:
//   function divide(a, b) {
//     return a / b;               ← returns Infinity when b = 0; no guard
//   }

// FIXED:
function divide(a, b) {
    if (b === 0) {
        return "Error: Cannot divide by zero.";
    }
    return a / b;
}


// ── Snippet 6 ── Accessing a property on null/undefined
// FAULTY:
//   let user = null;
//   console.log(user.name);   ← TypeError: Cannot read properties of null

// FIXED:
function getUserName(user) {
    if (user === null || user === undefined) {
        return "Error: User not found.";
    }
    return user.name;
}


// ── Snippet 7 ── Infinite loop (missing loop update)
// FAULTY:
//   let i = 0;
//   while (i < 5) {
//     console.log(i);    ← 'i' never incremented → infinite loop
//   }

// FIXED:
function countToFive() {
    let results = [];
    let i = 0;
    while (i < 5) {
        results.push(i);
        i++;                // ← increment added to prevent infinite loop
    }
    return results;
}


// ─────────────────────────────────────────────────────────────
// SECTION 3 — DEBUGGING TECHNIQUES (Subtask 4.1)
// ─────────────────────────────────────────────────────────────

// console.log() usage:
//   • Log variable values before/after operations to trace state changes.
//   • Log function inputs/outputs to verify expected behavior.
//
// Browser DevTools usage:
//   • Open DevTools with F12 → Console tab to see logged output and errors.
//   • Use the Sources tab to set breakpoints and step through code line by line.
//   • Use the Scope panel to inspect variable values at each breakpoint.
//   • Watch expressions let you monitor specific variables continuously.


// ─────────────────────────────────────────────────────────────
// SECTION 4 — RUN ALL FIXED FUNCTIONS & VERIFY (Subtask 4.2)
// ─────────────────────────────────────────────────────────────

function runTests() {
    const results = [];

    // Test greetUser
    const g = greetUser("Alice");
    results.push({ test: "greetUser('Alice')", expected: "Hello, Alice!", result: g, pass: g === "Hello, Alice!" });

    // Test checkAge
    const a1 = checkAge(20);
    const a2 = checkAge(15);
    results.push({ test: "checkAge(20)", expected: "You are an adult.", result: a1, pass: a1 === "You are an adult." });
    results.push({ test: "checkAge(15)", expected: "You are a minor.", result: a2, pass: a2 === "You are a minor." });

    // Test isEqualToTen
    const e1 = isEqualToTen(10);
    const e2 = isEqualToTen(5);
    results.push({ test: "isEqualToTen(10)", expected: "x equals 10.", result: e1, pass: e1 === "x equals 10." });
    results.push({ test: "isEqualToTen(5)", expected: "x does not equal 10.", result: e2, pass: e2 === "x does not equal 10." });

    // Test multiply
    const m = multiply(4, 5);
    results.push({ test: "multiply(4, 5)", expected: 20, result: m, pass: m === 20 });

    // Test divide
    const d1 = divide(10, 2);
    const d2 = divide(10, 0);
    results.push({ test: "divide(10, 2)", expected: 5, result: d1, pass: d1 === 5 });
    results.push({ test: "divide(10, 0)", expected: "Error: Cannot divide by zero.", result: d2, pass: d2 === "Error: Cannot divide by zero." });

    // Test getUserName
    const u1 = getUserName({ name: "Bob" });
    const u2 = getUserName(null);
    results.push({ test: "getUserName({name:'Bob'})", expected: "Bob", result: u1, pass: u1 === "Bob" });
    results.push({ test: "getUserName(null)", expected: "Error: User not found.", result: u2, pass: u2 === "Error: User not found." });

    // Test countToFive
    const c = countToFive();
    results.push({ test: "countToFive()", expected: "[0,1,2,3,4]", result: JSON.stringify(c), pass: JSON.stringify(c) === "[0,1,2,3,4]" });

    return results;
}

// Export for use in index.html
window.runTests = runTests;