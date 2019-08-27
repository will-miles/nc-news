exports.up = function(knex) {
  // console.log('Creating comments table...');
  return knex.schema.createTable('comments', commentsTable => {
    commentsTable.increments('comment-id').primary();
    commentsTable
      .string('author')
      .references('username')
      .inTable('users');
    commentsTable
      .integer('article_id')
      .references('article_id')
      .inTable('articles');
    commentsTable.integer('votes').defaultTo(0);
    commentsTable.timestamp('created_at').defaultTo(knex.fn.now());
    commentsTable.text('body');
  });
};

exports.down = function(knex) {
  // console.log('Dropping comments table...');
  return knex.schema.dropTable('comments');
};
