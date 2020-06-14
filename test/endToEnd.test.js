/* eslint-disable no-undef */
const chai = require('chai');
const chaiHttp = require('chai-http');
const data = require('../data/jsonData');
const app = require('../index');
const dataUsersMock = require('./mocks/user_list.json');
const dataPolicyMock = require('./mocks/policy_list.json');

chai.use(chaiHttp);
const { expect } = chai;
let token;

before((done) => {
    data.users = dataUsersMock;
    data.policies = dataPolicyMock;
    chai.request(app)
        .post('/oauth/token')
        .send({ grant_type: 'password', username: 'Britney', password: 'test' })
        .set('Authorization', 'Basic YXBwbGljYXRpb246c2VjcmV0')
        .set('Content-Type', 'application/x-www-form-urlencoded')
        .end((err, res) => {
            expect(res.statusCode).to.be.equal(200);
            token = res.body.accessToken;
            done();
        });
});

describe('GET /users being authenticated', () => {
    it('should authenticate and return all users/clients', (done) => {
        chai
            .request(app)
            .get('/users')
            .set('Authorization', `Bearer ${token}`)
            .end((err, res) => {
                expect(res.statusCode).to.be.equal(200);
                expect(res.body).to.be.instanceOf(Array);
                done();
            });
    });
});
