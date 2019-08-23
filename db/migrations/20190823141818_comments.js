exports.up = function(knex) {
  console.log('Creating comments table...');
  return knex.schema.createTable('comments', commentsTable => {
    commentsTable.incremets('comment-id').primary();
    commentsTable
      .string('author')
      .references('username')
      .inTable('users');
    commentsTable
      .int('article_id')
      .references('acrticle_id')
      .inTable('articles');
    commentsTable.int('votes').defaultTo(0);
    commentsTable.timestamp('created_at').defaultTo(knex.fn.now());
    commentsTable.string('body');
  });
};

exports.down = function(knex) {
  console.log('Dropping comments table...');
  return knex.schema.dropTable('comments');
};
