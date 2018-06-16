const chai = require('chai');
const chaiHttp = require('chai-http');
const server = require('../server');

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

                expect(res.body).to.deep.equal({result: 4});

                done();
            });
    });

    it('Should return "Hello World!"', done => {
        const task = "result = 'Hello World!';";

        chai.request(server)
            .post('/task')
            .send({ task })
            .end((err, res) => {
                expect(err).to.be.null;
                expect(res).to.have.status(200);

                expect(res.body).to.deep.equal({result: 'Hello World!'});

                done();
            });
    });
});