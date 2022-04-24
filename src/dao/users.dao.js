const { createPasswordHash } = require('../plugin/helper/bcrypt');
const roleDao = require('./roles.dao');

const userRepository = (db) => {
  // Get user by user id
  const getUserById = async (userId) => {
    try {
      const user = await db.one('select * from users where id = $1', [userId]);
      return user;
    } catch {
      throw Error(`${userId} does not exist`);
    }
  };

  const getUserByEmailId = async (email) => {
    try {
      const user = await db.one('select * from users where email = $1', [
        email,
      ]);
      return user;
    } catch {
      throw Error(`${email} does not exist!`);
    }
  };

  const getUserByUsername = async (userName) => {
    try {
      const user = await db.one('select * from users where username = $1', [
        userName,
      ]);
      return user;
    } catch {
      throw Error(`${userName} does not exist!`);
    }
  };

  const getAdminByUsername = async (userName) => {
    try {
      const user = await db.one(
        // 'select * from users where username = $1 join ',
        "select * from users u join roles r on r.role_id  = u.role_id  where r.type = 'ADMIN' and username = $1",
        [userName]
      );
      return user;
    } catch {
      throw Error(`${userName} does not exist!`);
    }
  };

  // save user in db
  const saveUser = async (user) => {
    try {
      const investorRoleId = await roleDao(db).getUserRole();

      console.log(createPasswordHash);
      const password = await createPasswordHash(user.password);

      const { user_id } = await db.one(
        'INSERT INTO users(first_name, last_name, username, password, email, role_id) VALUES($1, $2, $3, $4, $5, $6) RETURNING user_id',
        [
          user.firstName,
          user.lastName,
          user.userName,
          password,
          user.email,
          investorRoleId.role_id,
        ]
      );
      return user_id;
    } catch (error) {
      console.log(error.message);
      throw Error('Not valid user data - failed to save in db');
    }
  };

  return {
    getUserById,
    saveUser,
    getUserByEmailId,
    getUserByUsername,
    getAdminByUsername,
  };
};

module.exports = userRepository;
