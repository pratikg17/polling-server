const postRequestBody = {
  type: 'object',
  required: ['pollId', 'userId', 'pollOptionId'],
  properties: {
    pollId: {
      type: 'string',
    },
    pollOptionId: {
      type: 'string',
    },
    userId: {
      type: 'string',
    },
  },
};

const queryParameter = {
  type: 'object',
  required: ['limit', 'offset'],
  properties: {
    limit: {
      type: 'number',
    },
    offset: {
      type: 'number',
    },
  },
};

module.exports = {
  postRequestBody,
  queryParameter,
};
