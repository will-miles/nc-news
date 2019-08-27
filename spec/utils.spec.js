const { expect } = require('chai');
const {
  formatDates,
  makeRefObj,
  formatComments
} = require('../db/utils/utils');

describe('formatDates', () => {
  it('Returns a new array', () => {
    const input = [];
    expect(formatDates(input)).to.eql([]);
    expect(formatDates(input)).to.not.equal(input);
  });
  it('converts one object`s timestamp into js date format', () => {
    let input = [
      {
        title: 'Test',
        topic: 'testing',
        author: 'tester',
        body: 'This is a test.',
        created_at: 0
      }
    ];
    expect(formatDates(input)).to.eql([
      {
        title: 'Test',
        topic: 'testing',
        author: 'tester',
        body: 'This is a test.',
        created_at: new Date(0)
      }
    ]);
    input = [
      {
        title: 'Test',
        topic: 'testing',
        author: 'tester',
        body: 'This is a test.',
        created_at: 7203847203
      }
    ];
    expect(formatDates(input)).to.eql([
      {
        title: 'Test',
        topic: 'testing',
        author: 'tester',
        body: 'This is a test.',
        created_at: new Date(7203847203)
      }
    ]);
  });
  it('Returns altered array of multiple obects', () => {
    let input = [
      {
        title: 'Test-1',
        topic: 'testing',
        author: 'tester',
        body: 'This is a test.',
        created_at: 0
      },
      {
        title: 'Test-2',
        topic: 'testing',
        author: 'testee',
        body: 'This is a testamagig.',
        created_at: 57283031
      }
    ];
    expect(formatDates(input)).to.eql([
      {
        title: 'Test-1',
        topic: 'testing',
        author: 'tester',
        body: 'This is a test.',
        created_at: new Date(0)
      },
      {
        title: 'Test-2',
        topic: 'testing',
        author: 'testee',
        body: 'This is a testamagig.',
        created_at: new Date(57283031)
      }
    ]);
  });
});

describe('makeRefObj', () => {
  it('returns a new empty array when passed an empty array', () => {
    const arr = [];
    expect(makeRefObj(arr)).to.eql({});
    expect(makeRefObj(arr)).to.not.equal(arr);
  });
  it('works for an array of length 1', () => {
    expect(
      makeRefObj(
        [
          {
            article_id: 25,
            title:
              'Sweet potato & butternut squash soup with lemon & garlic toast',
            body:
              'Roast your vegetables in honey before blitzing into this velvety ' +
              'smooth, spiced soup - served with garlicky, zesty ciabatta slices for ' +
              'dipping',
            votes: 0,
            topic: 'cooking',
            author: 'weegembump'
          }
        ],
        'title',
        'article_id'
      )
    ).to.eql({
      'Sweet potato & butternut squash soup with lemon & garlic toast': 25
    });
  });
  it('works for an array of length > 1', () => {
    expect(
      makeRefObj(
        [
          {
            article_id: 25,
            title:
              'Sweet potato & butternut squash soup with lemon & garlic toast',
            body:
              'Roast your vegetables in honey before blitzing into this velvety ' +
              'smooth, spiced soup - served with garlicky, zesty ciabatta slices for ' +
              'dipping',
            votes: 0,
            topic: 'cooking',
            author: 'weegembump'
          },
          {
            article_id: 26,
            title: 'HOW COOKING HAS CHANGED US',
            body:
              'In a cave in South Africa, archaeologists have unearthed the remains of ' +
              'a million-year-old campfire, and discovered tiny bits of animal bones ' +
              'and ash from plants. It’s the oldest evidence of our ancient human ' +
              'ancestors—probably Homo erectus, a species that preceded ours—cooking a ' +
              'meal.',
            votes: 0,
            topic: 'cooking',
            author: 'weegembump'
          }
        ],
        'title',
        'article_id'
      )
    ).to.eql({
      'Sweet potato & butternut squash soup with lemon & garlic toast': 25,
      'HOW COOKING HAS CHANGED US': 26
    });
  });
});

describe('formatComments', () => {
  it('Returns a new emtpy array if passed an empty array.', () => {
    const input = [];
    expect(formatComments(input)).to.eql([]);
    expect(formatComments(input)).to.not.equal(input);
  });
});
