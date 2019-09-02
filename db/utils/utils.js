exports.formatDates = list => {
  return [...list].map(elem => {
    elem.created_at = new Date(elem.created_at);
    return elem;
  });
};

exports.makeRefObj = (array, key, value) => {
  return array.reduce((obj, element) => {
    obj[element[key]] = element[value];
    return obj;
  }, {});
};

exports.formatComments = (comments, articleRef) => {
  return comments.map(initialComment => {
    const comment = { ...initialComment };
    comment.article_id = articleRef[comment.belongs_to];
    comment.author = comment.created_by;
    delete comment.created_by;
    delete comment.belongs_to;
    comment.created_at = new Date(comment.created_at);
    return comment;
  });
};
