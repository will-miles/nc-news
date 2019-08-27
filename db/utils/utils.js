exports.formatDates = list => {
  return list.map(elem => {
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
  return [];
};
