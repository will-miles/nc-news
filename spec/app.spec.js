process.env.NODE_ENV = 'test';
const app = require('../app');
const request = require('supertest')(app);
const chai = require('chai');
const { expect } = require('chai');
const connection = require('../db/connection');

describe('/api', () => {
  beforeEach(() => {
    return connection.seed.run();
  });
  after(() => {
    return connection.destroy();
  });
  describe('/topics', () => {
    describe('GET', () => {
      it('Responds with an array of all topics in objects containing slug and description.', () => {
        return request
          .get('/api/topics')
          .expect(200)
          .then(({ body }) => {
            expect(body).to.be.an('array');
            expect(body.length).to.equal(3);
            expect(body[0]).to.contain.keys('description', 'slug');
          });
      });
      it('Responds with appropriate errors.', () => {
        return request
          .get('/api/topic')
          .expect(404)
          .then(({ body }) => {
            expect(body.msg).to.equal('Route not found');
          });
      });
    });
  });
  describe('/users', () => {
    describe('GET users by ID', () => {
      it('Responds with the user object corresponding to the input ID.', () => {
        return request
          .get('/api/users/butter_bridge')
          .expect(200)
          .then(({ body }) => {
            expect(body).to.be.an('object');
            expect(body).to.contain.keys('username', 'avatar_url', 'name');
          });
      });
    });
    describe('GET errors', () => {
      it('Responds with appropriate errors', () => {
        return request
          .get('/api/users/1')
          .expect(404)
          .then(({ body }) => {
            expect(body).to.eql({ msg: 'No user found for username: 1' });
          });
      });
    });
  });
  describe('/articles', () => {
    describe('GET article by ID', () => {
      it('Returns the correct article data correspondng to the ID provided', () => {
        return request
          .get('/api/articles/1')
          .expect(200)
          .then(({ body }) => {
            expect(body).to.be.an('object');
            expect(body.comments_count).to.equal('13');
          });
      });
    });
    describe('GET errors', () => {
      it('Responds with appropriate errors', () => {
        return request
          .get('/api/articles/92')
          .expect(404)
          .then(({ body }) => {
            expect(body).to.eql({ msg: 'No article found for article_id: 92' });
          });
      });
    });
  });
});
