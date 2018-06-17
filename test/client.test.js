const chai = require('chai');
const mock = require('mock-require');

const argsParser = require('../src/client/args-parser');

const expect = chai.expect;

describe('ARGS PARSER TESTS', () => {
    it('Should return null on missing key value', done => {
        const args = argsParser(['', '', '', 'KEY']);
        expect(args).to.be.null;

        done();
    });

    it('Should return null on missing filename', done => {
        const args = argsParser(['', '']);
        expect(args).to.be.null;

        done();
    });

    it('Should return "input.js" as filePath', done => {
        const args = argsParser(['', '', 'input.js']);
        expect(args.filePath).to.be.equal('input.js');
        expect(args.data).to.be.empty;

        done();
    });

    it('Should return {key1: 1, key2: 2} as data', done => {
        const args = argsParser(['', '', 'input.js', 'key1', '1', 'key2', '2']);
        expect(args.filePath).to.be.equal('input.js');
        expect(args.data).to.deep.equal({key1: '1', key2: '2'});

        done();
    });
});

describe('CLIENT SERVICE TESTS', () => {
    let clientService;

    before(() => {
       mock('fs', {
           readFileSync: (filepath, options) => ({ filepath: filepath })
       });

       mock('request', {
           post: (config, callback) => {
                if (config.url === 'http://localhost:8000/task') {
                    callback(null, null, { result: 4 });
                } else {
                    callback({ status: 404 }, null, null);
                }
           }
       });

       clientService = require('../src/client/client.service');
    });

    it('Should return { filepath: \'file.js\' } as loaded file', done => {
        let file = clientService.readFile('file.js');
        expect(file).to.deep.equal({ filepath: 'file.js' });

        done();
    });

    it('Should return response { result: 4 }', done => {
        clientService.sendFile('http://localhost:8000/task', '', '')
            .then(body => {
                expect(body).to.deep.equal({ result: 4 });
                done();
            });
    });

    it('Should return 404 error', done => {
        clientService.sendFile('http://localhost:8000/foo/bar', '', '')
            .catch(error => {
                expect(error).to.deep.equal({ status: 404 });
                done();
            });
    });
});