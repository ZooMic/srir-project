const chai = require('chai');
const chaiHttp = require('chai-http');
const server = require('../src/server/server');

let expect = chai.expect;

chai.use(chaiHttp);

describe('OTHER ENDPOINTS', () => {
    it('Should return 404 on non existing endpoint', done => {
        chai.request(server)
            .get('/foo')
            .end((err, res) => {
                expect(err).to.be.null;
                expect(res).to.have.status(404);

                done();
            });
    })
});

describe('POST /task', () => {
    it('Should return 400 on empty body', done => {
        chai.request(server)
            .post('/task')
            .end((err, res) => {
                expect(err).to.be.null;
                expect(res).to.have.status(400);

                expect(res.text).to.be.equal('Body is empty');

                done();
            });
    });

    it('Should return 4 on 2 + 2 program', done => {
        const task = "result = 2 + 2;";

        chai.request(server)
            .post('/task')
            .send({ task })
            .end((err, res) => {
                expect(err).to.be.null;
                expect(res).to.have.status(200);

                expect(res.body.result).to.equal(4);

                done();
            });
    });

    it('Should return supplied data = "Hello World!"', done => {
        const data = 'Hello World!';
        const task = "result = data;";

        chai.request(server)
            .post('/task')
            .send({ task, data })
            .end((err, res) => {
                expect(err).to.be.null;
                expect(res).to.have.status(200);

                expect(res.body.result).to.equal('Hello World!');

                done();
            });
    });

    it('Should return "Error - forbidden console"', done => {
        const task = "console.log('Hello World!');";

        chai.request(server)
            .post('/task')
            .send({ task })
            .end((err, res) => {
                expect(err).to.be.null;
                expect(res).to.have.status(400);

                expect(res.body).to.deep.equal({result: 'Error: There is forbidden (console) word in your code at position (0).'});

                done();
            });
    });

});