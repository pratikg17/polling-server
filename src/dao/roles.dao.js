const dao = (db) => {
  const getAllRoles = () => db.query('select * from roles');
  const getUserRole = () =>
    db.one("select role_id from roles where type ='USER'");
  return {
    getAllRoles,
    getUserRole,
  };
};

module.exports = dao;
