const bcrypt = require('bcrypt');
const saltRounds = 10;

module.exports.createPasswordHash = async (password) => {
  const pass = await bcrypt.hash(password, saltRounds);
  console.log(pass);
  return pass;
};

module.exports.checkPassword = async (password, passwordHash) => {
  const match = await bcrypt.compare(password, passwordHash);
  return match;
};
