const chai = require('chai');
const mock = require('mock-require');
const fs = require('fs');

const expect = chai.expect;

const arch = require('../src/server/archive');
const createDiff = arch.createDiff;
const archiveCode = arch.archiveCode;

describe('ARCHIVE TESTS', () => {

    it('Should add code to valid archive file', done => {

        const sampleArchiveFilePath = "./testArchive.json";

        if(fs.existsSync(sampleArchiveFilePath)){
            fs.unlinkSync(sampleArchiveFilePath);
        }

        fs.appendFileSync(sampleArchiveFilePath,"[]");

        const sampleCode = "result = 2 + 2;";
        archiveCode(sampleCode, sampleArchiveFilePath);

        const archivedTestFile = fs.readFileSync(sampleArchiveFilePath, 'utf8');
        const testArchives = JSON.parse(archivedTestFile);

        expect(testArchives.length).to.be.equal(1);

        fs.unlinkSync(sampleArchiveFilePath);

        done();
    });
});

describe('DIFF TESTS', () => {
    
    const sampleArchiveFilePath = "./testArchive1.json";
    
    const addToArchives = (code) => {
        const sampleArchiveFile = fs.readFileSync(sampleArchiveFilePath);
        const archivedCodes = JSON.parse(sampleArchiveFile);

        archivedCodes.push(code);

        fs.writeFileSync(sampleArchiveFilePath, JSON.stringify(archivedCodes));
    };

    const clearArchives = () => {
        const sampleArchiveFile = fs.readFileSync(sampleArchiveFilePath);
        const archivedCodes = JSON.parse(sampleArchiveFile);

        archivedCodes.length = 0;

        fs.writeFileSync(sampleArchiveFilePath, JSON.stringify(archivedCodes));
    };

    before(() => {
        if(fs.existsSync(sampleArchiveFilePath)){
            fs.unlinkSync(sampleArchiveFilePath);
        }

        fs.appendFileSync(sampleArchiveFilePath,"[]");
    });

    after(()=>{
        if(fs.existsSync(sampleArchiveFilePath)){
            fs.unlinkSync(sampleArchiveFilePath);
        }
    });

    it("Should return 2 removed, 2 added ", done => {

        addToArchives("result = 2 + 2;");
        addToArchives("result = 5 + 5;");

        const comparison = createDiff(sampleArchiveFilePath);

        expect(comparison.added).to.be.equal(2);
        expect(comparison.removed).to.be.equal(2);

        clearArchives();

        done();
    });

    it("Should return 4 removed, 0 added ", done => {

        addToArchives("result = 2 + 2;");
        addToArchives("result = 2;");

        const comparison = createDiff(sampleArchiveFilePath);

        expect(comparison.added).to.be.equal(0);
        expect(comparison.removed).to.be.equal(4);

        clearArchives();

        done();
    });

    it("Should return message, when there is nothing to compare", done => {

        const comparison = createDiff(sampleArchiveFilePath);

        expect(comparison.msg).to.be.not.equal(null);
        expect(comparison.msg).to.be.not.equal(undefined);

        clearArchives();

        done();
    });

    it("Should return message, when codes are the same", done => {

        addToArchives("result = 2 + 2;");
        addToArchives("result = 2 + 2;");
        
        const comparison = createDiff(sampleArchiveFilePath);

        expect(comparison.msg).to.be.not.equal(null);
        expect(comparison.msg).to.be.not.equal(undefined);

        clearArchives();

        done();
    });
});