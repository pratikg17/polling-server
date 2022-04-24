const postRequestBody = {
  type: 'object',
  required: ['firstName', 'password', 'email', 'userName'],
  properties: {
    id: {
      type: 'string',
    },
    firstName: {
      type: 'string',
    },
    lastName: {
      type: 'string',
    },
    userName: {
      type: 'string',
    },
    lastName: {
      type: 'string',
    },
    password: {
      type: 'string',
      minLength: 3,
    },
    email: {
      type: 'string',
      format: 'email',
    },
  },
};

const postResponseBody = {
  201: {
    type: 'object',
    required: ['userId'],
    properties: {
      userId: {
        type: 'string',
        format: 'uuid',
      },
    },
  },
  400: {
    type: 'object',
    required: ['statusCode', 'error', 'message'],
    properties: {
      statusCode: {
        type: 'number',
      },
      error: {
        type: 'string',
      },
      message: {
        type: 'string',
      },
    },
  },
};

const getRequestparams = {
  type: 'object',
  properties: {
    userId: {
      type: 'string',
      format: 'uuid',
    },
  },
};

const getResponseBody = {
  200: {
    type: 'object',
    required: [
      'userId',
      'username',
      'email',
      'createdAt',
      'updatedAt',
      'version',
    ],
    properties: {
      userId: {
        type: 'string',
        format: 'uuid',
      },
      username: {
        type: 'string',
      },
      firstName: {
        type: 'string',
      },
      lastName: {
        type: 'string',
      },
      email: {
        type: 'string',
        format: 'email',
      },
      createdAt: {
        type: 'string',
      },
      updatedAt: {
        type: 'string',
      },
    },
  },
};

module.exports = {
  postRequestBody,
  postResponseBody,
  getRequestparams,
  getResponseBody,
};