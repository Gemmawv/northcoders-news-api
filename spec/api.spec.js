process.env.NODE_ENV = 'test';
const { expect } = require('chai');
const request = require('supertest');
const server = require('../server');
const saveTestData = require('../seed/test.seed');
const config = require('../config');
const mongoose = require('mongoose');
mongoose.Promise = global.Promise;
const db = config.DB[process.env.NODE_ENV] || process.env.DB;

describe('API', function () {
    beforeEach((done) => {
        mongoose.connection.dropDatabase()
            .then(() => saveTestData(db, function (err) {
                if (err) throw err;
                done();
            }));
    });
    describe('GET /', function () {
        it('responds with status code 200', function (done) {
            request(server)
                .get('/')
                .end((err, res) => {
                    if (err) done(err);
                    else {
                        expect(res.status).to.equal(200);
                        done();
                    }
                });
        });
    });
    describe('GET /topics', function () {
        it('responds with all topics', function (done) {
            request(server)
                .get('/api/topics')
                .end((err, res) => {
                    if (err) return console.log(err);
                    expect(res.status).to.equal(200);
                    expect(res.body.topics.length).to.equal(3);
                    done();

                });
        });
    });
});