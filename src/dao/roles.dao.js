const dao = (db) => {
  const getAllRoles = () => db.query('select * from roles');
  const getInvestorRole = () =>
    db.one("select role_id from roles where type ='INVESTOR'");
  return {
    getAllRoles,
    getInvestorRole,
  };
};

module.exports = dao;
