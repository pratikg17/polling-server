const moment = require('moment');
const UserRepository = require('../dao/users.dao');
const { checkPassword } = require('../plugin/helper/bcrypt');
const userService = (fastify) => {
  const userRepository = UserRepository(fastify.db);

  const getUserById = async (userId) => {
    const user = await userRepository.getUserById(userId);

    return {
      id: user.id,
      username: user.username,
      firstName: user.first_name,
      lastName: user.last_name,
      email: user.email,
      createdAt: moment(user.created_at).format('DD/MM/YYYY'),
      updatedAt: moment(user.updated_at).format('DD/MM/YYYY'),
    };
  };

  const getUserByEmailId = async (email, password) => {
    const user = await userRepository.getUserByEmailId(email);

    if (user.password !== password) {
      throw Error('Password is not valid!');
    }

    return {
      id: user.id,
      username: user.username,
      firstName: user.first_name,
      lastName: user.last_name,
      email: user.email,
      createdAt: moment(user.created_at).format('DD/MM/YYYY'),
      updatedAt: moment(user.updated_at).format('DD/MM/YYYY'),
    };
  };

  const getAdminAuthetication = async (email, password) => {
    const user = await userRepository.getAdminByUsername(email);

    if (user.password !== password) {
      throw Error('Password is not valid!');
    }

    return {
      id: user.id,
      username: user.username,
      firstName: user.first_name,
      lastName: user.last_name,
      email: user.email,
      createdAt: moment(user.created_at).format('DD/MM/YYYY'),
      updatedAt: moment(user.updated_at).format('DD/MM/YYYY'),
    };
  };

  const getUserAuthetication = async (userName, password) => {
    const user = await userRepository.getUserByUsername(userName);

    const match = await checkPassword(password, user.password);

    if (!match) {
      throw Error('Password is not valid!');
    }

    return {
      userId: user.user_id,
      username: user.username,
      firstName: user.first_name,
      lastName: user.last_name,
      email: user.email,
      createdAt: moment(user.created_at).format('DD/MM/YYYY'),
      updatedAt: moment(user.updated_at).format('DD/MM/YYYY'),
    };
  };

  // save user in db and return id
  const createUser = async (user) => {
    const userId = await userRepository.saveUser(user);
    return userId;
  };

  return {
    getUserById,
    createUser,
    getUserByEmailId,
    getUserAuthetication,
    getAdminAuthetication,
  };
};

module.exports = userService;
