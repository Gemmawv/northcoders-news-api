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
  let usefulIds;
  beforeEach((done) => {
    mongoose.connection.dropDatabase()
      .then(() => saveTestData(db, function (err, ids) {
        if (err) throw err;
        usefulIds = ids;
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

  describe('GET /api/topics/:topic_id/articles', function () {
    it('should return all of the articles that match the requested topic', function (done) {
      request(server)
        .get('/api/topics/football/articles')
        .end((err, res) => {
          if (err) return console.log(err);
          expect(res.status).to.equal(200);
          expect(res.body.articlesByTopic.length).to.equal(1);
          done();
        });
    });
    it('should respond with status code 404 if the topic does not exist', function (done) {
      request(server)
        .get('/api/topics/coconuts/articles')
        .end((err, res) => {
          if (err) return console.log(err);
          expect(res.status).to.equal(404);
          expect(res.body.message).to.equal('Topic not found');
          done();
        });
    });
  });

  describe('GET /articles', function () {
    it('responds with all articles', function (done) {
      request(server)
        .get('/api/articles')
        .end((err, res) => {
          if (err) return console.log(err);
          expect(res.status).to.equal(200);
          expect(res.body.articles.length).to.equal(2);
          done();
        });
    });
  });

  describe('GET /api/articles/:article_id/comments', function () {
    it('should return all of the comments that match the requested article', function (done) {
      let ArticleId = usefulIds.article_id;
      request(server)
        .get(`/api/articles/${ArticleId}/comments`)
        .end((err, res) => {
          if (err) return console.log(err);
          expect(res.status).to.equal(200);
          expect(res.body.commentsForArticles.length).to.equal(2);
          done();
        });
    });
    it('should respond with status code 404 if the article does not exist', function (done) {
      request(server)
        .get('/api/articles/123cf45ab75d862c4fbffa09/comments')
        .end((err, res) => {
          if (err) return console.log(err);
          expect(res.status).to.equal(404);
          expect(res.body.message).to.equal('Article not found');
          done();
        });
    });
    it('should respond with status code 422 if the article id is invalid', function (done) {
      request(server)
        .get('/api/articles/fakeid/comments')
        .end((err, res) => {
          if (err) return console.log(err);
          expect(res.status).to.equal(422);
          expect(res.body.message).to.equal('Incorrect/Invalid ID');
          done();
        });
    });
  });

});