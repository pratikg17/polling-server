const rolesDao = require('../dao/roles.dao');

const rolesService = (fastify) => {
  const dao = rolesDao(fastify);

  const getAllRoles = () => dao.getAllRoles();
  const getInvestorRole = () => dao.getInvestorRole();

  return { getInvestorRole, getAllRoles };
};

module.exports = rolesService;
