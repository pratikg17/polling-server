const rolesDao = require('../dao/roles.dao');

const rolesService = (fastify) => {
  const dao = rolesDao(fastify);

  const getAllRoles = () => dao.getAllRoles();
  const getUserRole = () => dao.getUserRole();

  return { getUserRole, getAllRoles };
};

module.exports = rolesService;
