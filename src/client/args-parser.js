const parseArgs = (args = process.argv) => {
    if (args.length < 3) {
        console.log('Invalid arguments! \nUsage: \n node client.js [file_path] [data]');
        console.log('\nExample: \n node client.js input.js fibonacciNumber 16');
        return null;
    }

    let filePath = args[2];
    let data = {};

    if (args.length > 3) {
        for (let i = 3; i < args.length; i += 2) {
            let key = args[i];
            if (i + 1 > args.length - 1) {
                console.error("Missing value for key '" + key + "'");
                return null;
            }

            data[key] = args[i + 1];
        }
    }

    return { filePath, data };
};

module.exports = parseArgs;