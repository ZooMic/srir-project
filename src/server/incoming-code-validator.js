const forbidden = [
    "console",
    "_dirname",
    "_filename",
    "exports",
    "global",
    "module",
    "process",
    "require",
    "eval",
    "Function",
    "app",
    "port",
    "incomingCodeValidator",
    "bodyParser",
    "express",
    "server",
    "performTask",
    "task",
];

/**
 * Validates task code to ensure it does not contain potentially harmful instructions
 * @param {string} code - supplied task code
 * @returns {object}
 */
const incomingCodeValidator = (code) => {
    let result = null;

    forbidden.forEach(word => {
        const index = code.indexOf(word);
        if (index > -1) {
            result = {
                success: false,
                position: index,
                word,
                message: `Error: There is forbidden (${word}) word in your code at position (${index}).`
            };
        }
    });

    return !!result ? result : { success: true }
};

module.exports = incomingCodeValidator;