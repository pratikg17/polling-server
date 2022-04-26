const postRequestBody = {
  type: 'object',
  required: ['pollName', 'userId', 'pollOptions'],
  properties: {
    pollName: {
      type: 'string',
    },
    pollDesc: {
      type: 'string',
    },
    userId: {
      type: 'string',
    },
    pollOptions: {
      type: 'array',
    },
    isFeatured: {
      type: 'boolean',
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
