/**
 * Parses command line arguments array,
 * to retrieve file path to task file and data for task
 * @param {array} args - command line arguments
 * @returns {object}
 */
const parseArgs = (args = process.argv) => {
    if (args.length < 3) {
        return null;
    }

    let filePath = args[2];
    let data = {};

    if (args.length > 3) {
        for (let i = 3; i < args.length; i += 2) {
            let key = args[i];
            if (i + 1 > args.length - 1) {
                return null;
            }

            data[key] = args[i + 1];
        }
    }

    return { filePath, data };
};

module.exports = parseArgs;