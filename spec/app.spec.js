process.env.NODE_ENV = 'test';
const app = require('../app');
const request = require('supertest')(app);
const chai = require('chai');
const { expect } = require('chai');
const connection = require('../db/connection');
const chaiSorted = require('chai-sorted');

chai.use(chaiSorted);

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
      describe('GET errors', () => {
        it('Responds with appropriate 404 error.', () => {
          return request
            .get('/api/topic')
            .expect(404)
            .then(({ body }) => {
              expect(body.msg).to.equal('Route not found');
            });
        });
      });
    });
  });
  describe('/users', () => {
    describe('GET users by username', () => {
      it('Responds with the user data object corresponding to the input username.', () => {
        return request
          .get('/api/users/butter_bridge')
          .expect(200)
          .then(({ body }) => {
            expect(body).to.be.an('object');
            expect(body).to.contain.keys('username', 'avatar_url', 'name');
          });
      });
      describe('GET errors', () => {
        it('Responds with appropriate 404 error', () => {
          return request
            .get('/api/users/1')
            .expect(404)
            .then(({ body }) => {
              expect(body).to.eql({ msg: 'Not found' });
            });
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
      describe('GET errors', () => {
        it('Responds with appropriate 404 error', () => {
          return request
            .get('/api/articles/92')
            .expect(404)
            .then(({ body }) => {
              expect(body).to.eql({
                msg: 'Not found'
              });
            });
        });
        it('Responds with appropriate 400 error', () => {
          return request
            .get('/api/articles/badID')
            .expect(400)
            .then(({ body }) => {
              expect(body).to.eql({
                msg: 'Bad request'
              });
            });
        });
      });
    });
    describe('PATCH article-votes by ID', () => {
      it('Can increase the number of votes', () => {
        return request
          .patch('/api/articles/1')
          .send({ inc_votes: 1 })
          .expect(200)
          .then(({ body }) => {
            expect(body.votes).to.equal(101);
          });
      });
      it('Can decrease the number of votes', () => {
        return request
          .patch('/api/articles/1')
          .send({ inc_votes: -1 })
          .expect(200)
          .then(({ body }) => {
            expect(body.votes).to.equal(99);
          });
      });
      describe('PATCH errors', () => {
        it('Responds with appropriate 404 error', () => {
          return request
            .patch('/api/articles/92')
            .send({ inc_votes: -1 })
            .expect(404)
            .then(({ body }) => {
              expect(body).to.eql({
                msg: 'Not found'
              });
            });
        });
        it('Responds with appropriate 400 error', () => {
          return request
            .patch('/api/articles/badID')
            .send({ inc_votes: -1 })
            .expect(400)
            .then(({ body }) => {
              expect(body).to.eql({
                msg: 'Bad request'
              });
            });
        });
        it('Responds with appropriate 400 error', () => {
          return request
            .patch('/api/articles/1')
            .send({ inc_votes: 'not a number' })
            .expect(400)
            .then(({ body }) => {
              expect(body).to.eql({
                msg: 'Bad request'
              });
            });
        });
      });
    });
    describe('POST new comment to article', () => {
      it('Posts and returns a new comment', () => {
        return request
          .post('/api/articles/1/comments')
          .send({
            username: 'butter_bridge',
            body: 'This is a new test comment :)'
          })
          .expect(201)
          .then(({ body }) => {
            expect(body).to.contain.keys(
              'author',
              'body',
              'article_id',
              'votes',
              'created_at'
            );
          });
      });
      describe('POST errors', () => {
        it('Responds with appropriate 404 error', () => {
          return request
            .post('/api/articles/4789/comments')
            .send({
              username: 'butter_bridge',
              body: 'This is a new test comment :)'
            })
            .expect(404)
            .then(({ body }) => {
              expect(body.msg).to.equal('Not found');
            });
        });
        it('Responds with appropriate 404 error', () => {
          return request
            .post('/api/articles/1/comments')
            .send({
              username: 'notauser',
              body: 'This is a new test comment :)'
            })
            .expect(404)
            .then(({ body }) => {
              expect(body.msg).to.equal('Not found');
            });
        });
        it('Responds with appropriate 400 error', () => {
          return request
            .post('/api/articles/notanid/comments')
            .send({
              username: 'butter_bridge',
              body: 'This is a new test comment :)'
            })
            .expect(400)
            .then(({ body }) => {
              expect(body.msg).to.equal('Bad request');
            });
        });
      });
    });
    describe('GET comments for article', () => {
      it('Returns an array of comments for the given article', () => {
        return request
          .get('/api/articles/1/comments')
          .expect(200)
          .then(({ body }) => {
            expect(body).to.be.an('array');
            expect(body).to.be.sortedBy('created_at', { descending: true });
          });
      });
      it('Can be sorted by different column and order', () => {
        return request
          .get('/api/articles/1/comments?sort_by=votes&order=asc')
          .expect(200)
          .then(({ body }) => {
            expect(body).to.be.sortedBy('votes', { descending: false });
          });
      });
      describe('GET errors', () => {
        it('Responds with appropriate 404 error', () => {
          return request
            .get('/api/articles/456/comments')
            .expect(404)
            .then(({ body }) => {
              expect(body.msg).to.equal('Not found');
            });
        });
        it('Responds with appropriate 400 error', () => {
          return request
            .get('/api/articles/notanid/comments')
            .expect(400)
            .then(({ body }) => {
              expect(body.msg).to.equal('Bad request');
            });
        });
        it('Responds with 200 + [] if article exists with no comments', () => {
          return request
            .get('/api/articles/2/comments')
            .expect(200)
            .then(({ body }) => {
              expect(body).to.eql([]);
            });
        });
      });
    });
    describe('GET all articles', () => {
      it('Returns the correct article data for all articles', () => {
        return request
          .get('/api/articles')
          .expect(200)
          .then(({ body }) => {
            expect(body).to.be.an('array');
            expect(body[0]).to.contain.keys(
              'author',
              'title',
              'article_id',
              'topic',
              'created_at',
              'votes',
              'comments_count'
            );
            expect(body[0].comments_count).to.equal('13');
          });
      });
      it('Returns articles filtered by author', () => {
        return request
          .get('/api/articles?author=butter_bridge')
          .expect(200)
          .then(({ body }) => {
            expect(body).to.be.an('array');
            expect(body.length).to.equal(3);
          });
      });
      it('Returns articles filtered by topic', () => {
        return request
          .get('/api/articles?topic=cats')
          .expect(200)
          .then(({ body }) => {
            expect(body).to.be.an('array');
            expect(body.length).to.equal(1);
          });
      });
      it('Returns articles filtered by author && topic', () => {
        return request
          .get('/api/articles?author=rogersop&&topic=mitch')
          .expect(200)
          .then(({ body }) => {
            expect(body).to.be.an('array');
            expect(body.length).to.equal(2);
          });
      });
      describe('GET errors', () => {
        it('Responds with appropriate 404 error', () => {
          return request
            .get('/api/notandendpoint')
            .expect(404)
            .then(({ body }) => {
              expect(body.msg).to.equal('Route not found');
            });
        });
        it('Responds with appropriate 404 error', () => {
          return request
            .get('/api/articles?author=notauser')
            .expect(404)
            .then(({ body }) => {
              expect(body.msg).to.equal('Not found');
            });
        });
        it('Responds with appropriate 404 error', () => {
          return request
            .get('/api/articles?topic=notatopic')
            .expect(404)
            .then(({ body }) => {
              expect(body.msg).to.equal('Not found');
            });
        });
        it('Responds with appropriate 404 error', () => {
          return request
            .get('/api/articles?topic=notatopic&&author=notanauthor')
            .expect(404)
            .then(({ body }) => {
              expect(body.msg).to.equal('Not found');
            });
        });
        it('Responds with appropriate 200 for incorrect column query request', () => {
          return request
            .get('/api/articles?notacolumn=something')
            .expect(200)
            .then(({ body }) => {
              expect(body).to.be.an('array');
            });
        });
      });
    });
  });
  describe('/comments', () => {
    describe('PATCH comment-votes by ID', () => {
      it('Can increase the number of votes', () => {
        return request
          .patch('/api/comments/1')
          .send({ inc_votes: 1 })
          .expect(200)
          .then(({ body }) => {
            expect(body.votes).to.equal(17);
          });
      });
      it('Can decrease the number of votes', () => {
        return request
          .patch('/api/comments/1')
          .send({ inc_votes: -1 })
          .expect(200)
          .then(({ body }) => {
            expect(body.votes).to.equal(15);
          });
      });
      describe('PATCH errors', () => {
        it('Responds with appropriate 404 error', () => {
          return request
            .patch('/api/comments/92')
            .expect(404)
            .then(({ body }) => {
              expect(body).to.eql({
                msg: 'Not found'
              });
            });
        });
        it('Responds with appropriate 400 error', () => {
          return request
            .patch('/api/comments/2')
            .send({ inc_votes: 'not a number' })
            .expect(400)
            .then(({ body }) => {
              expect(body).to.eql({
                msg: 'Bad request'
              });
            });
        });
        it('Responds with appropriate 400 error', () => {
          return request
            .patch('/api/comments/notanid')
            .send({ inc_votes: 1 })
            .expect(400)
            .then(({ body }) => {
              expect(body).to.eql({
                msg: 'Bad request'
              });
            });
        });
      });
    });
    describe('DELETE comment by ID', () => {
      it('deletes the given comment succesfully', () => {
        return request.delete('/api/comments/1').expect(204);
      });
      describe('DELETE errors', () => {
        it('Responds with appropriate 404 error', () => {
          return request
            .delete('/api/comments/92')
            .expect(404)
            .then(({ body }) => {
              expect(body).to.eql({
                msg: 'Not found'
              });
            });
        });
        it('Responds with appropriate 400 error', () => {
          return request
            .delete('/api/comments/notanid')
            .expect(400)
            .then(({ body }) => {
              expect(body).to.eql({
                msg: 'Bad request'
              });
            });
        });
      });
    });
  });
});
