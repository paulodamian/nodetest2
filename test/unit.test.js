/* eslint-disable no-undef */
const chai = require('chai');
const data = require('../data/jsonData');
const dataUsersMock = require('./mocks/user_list.json');
const dataPolicyMock = require('./mocks/policy_list.json');

const { expect } = chai;

describe('Data initialization and handling', () => {
    beforeEach(() => {
        data.users = dataUsersMock;
        data.policies = dataPolicyMock;
        query = {};
    });

    it('should return all users/clients when called', () => {
        const userList = data.getUsers(query);
        expect(userList).to.be.instanceOf(Array).which.have.lengthOf(5);
        expect(userList[0]).to.have.property('id');
        expect(userList[0]).to.have.property('name');
        expect(userList[0]).to.have.property('email');
        expect(userList[0]).to.have.property('role');
    });

    it('should return user/clients filtered by query', () => {
        query = { role: 'user' };
        const userList = data.getUsers(query);
        expect(userList).to.be.instanceOf(Array).which.have.lengthOf(2);
    });

    it('should return all policies when called', () => {
        const userList = data.getPolicies(query);
        expect(userList).to.be.instanceOf(Array).which.have.lengthOf(11);
    });

    it('should return policies filtered by query', () => {
        query = { clientId: 'e8fd159b-57c4-4d36-9bd7-a59ca13057bb' };
        const userList = data.getPolicies(query);
        expect(userList).to.be.instanceOf(Array).which.have.lengthOf(5);
    });
});
