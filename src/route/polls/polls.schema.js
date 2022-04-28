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

const updateRequestBody = {
  type: 'object',
  required: ['pollId', 'pollName', 'userId', 'pollOptions'],
  properties: {
    pollId: {
      type: 'string',
    },
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
  updateRequestBody,
};
