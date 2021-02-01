const db = require('../../data/db-config');

const getCompany = async (id) => {
  return await db('companies').select('*').where('id', '=', id);
};
const getCompanyUsers = async (id) => {
  return await db('profiles').select('*').where('company', '=', id);
};

const getCompanyUser = async (id) => {
  return await db('profiles').where({ id }).select('*').first();
};

const createUser = async (user) => {
  return await db('profiles').insert(user).returning('*');
};

const updateProfile = async (updates, userId) => {
  return await db('profiles').where('id', '=', userId).update(updates);
};

const deleteUser = async (id) => {
  return await db('profiles').where('id', '=', id).del();
};

module.exports = {
  getCompany,
  getCompanyUsers,
  getCompanyUser,
  createUser,
  updateProfile,
  deleteUser,
};
