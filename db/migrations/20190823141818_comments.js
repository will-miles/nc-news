exports.up = function(knex) {
  // console.log('Creating comments table...');
  return knex.schema.createTable('comments', commentsTable => {
    commentsTable
      .increments('comment_id')
      .primary()
      .notNullable();
    commentsTable
      .string('author')
      .references('username')
      .inTable('users')
      .notNullable();
    commentsTable
      .integer('article_id')
      .references('article_id')
      .inTable('articles')
      .notNullable();
    commentsTable.integer('votes').defaultTo(0);
    commentsTable.timestamp('created_at').defaultTo(knex.fn.now());
    commentsTable.text('body').notNullable();
  });
};

exports.down = function(knex) {
  // console.log('Dropping comments table...');
  return knex.schema.dropTable('comments');
};
