const fs = require('fs');
const jsdiff = require('diff');

const archivePath = "./archives.json";

const archiveCode = code => {
    const archivesFile = fs.readFileSync(archivePath, 'utf8');
    const archives = JSON.parse(archivesFile);
    archives.push(code);
    fs.writeFileSync(archivePath, JSON.stringify(archives));
}

const createDiff = () => {
    const archivesFile = fs.readFileSync(archivePath, 'utf8');
    
    const archives = JSON.parse(archivesFile);
    if (archives.length > 1) {
        const index = archives.length - 1;
        const newCode = archives[index];
        const oldCode = archives[index - 1];

        const diff = jsdiff.diffChars(oldCode, newCode);
        
        let added = 0;
        let removed = 0;

        diff.forEach(item => {
            const { count, added: a, removed: r } = item;
            added += a ? count : 0;
            removed += r ? count : 0;
        });

        return {
            added,
            removed,
            diff,
        };
    }

    return {
        msg: "nothing to compare",
    };
}


module.exports = {
    archiveCode,
    createDiff,
}