/* eslint-disable no-undef */
const chai = require('chai');
const chaiHttp = require('chai-http');
const app = require('../index');

chai.use(chaiHttp);
const { expect } = chai;

describe('GET /users without an auth token', () => {
    it('should return an authorization error', (done) => {
        chai
            .request(app)
            .get('/users')
            .end((err, res) => {
                expect(res.statusCode).to.be.equal(401);
                expect(res.body.message).to.be.equal('Unauthorized request: no authentication given');
                done();
            });
    });
});
