const {
  topicData,
  articleData,
  commentData,
  userData
} = require('../data/index.js');

const { formatDates, formatComments, makeRefObj } = require('../utils/utils');

exports.seed = function(knex) {
  return knex.migrate
    .rollback()
    .then(() => knex.migrate.latest())
    .then(() => {
      const topicsInsertions = knex('topics').insert(topicData);
      const usersInsertions = knex('users').insert(userData);

      return Promise.all([topicsInsertions, usersInsertions]);
    })
    .then(() => {
      const correctedArticleData = formatDates(articleData);
      return knex('articles')
        .insert(correctedArticleData)
        .returning('*');
    })
    .then(articleRows => {
      const articleRef = makeRefObj(articleRows, 'title', 'article_id');
      // console.log(articleRef);
      const formattedComments = formatComments(commentData, articleRef);
      // console.log(formattedComments);
      return knex('comments').insert(formattedComments);
    })
    .then(() => {
      console.log('       Seeding Completed...');
    });
};
