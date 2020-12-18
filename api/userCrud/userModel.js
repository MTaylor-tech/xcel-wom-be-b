const db = require('../../data/db-config');

const getCompanyUsers = async (id) => {
    return await db('profiles')
      .select()
      .where('company', '=', id)    
  };

const getCompanyUser = async (company_id, user_id) => {
    return await db('profiles')
      .select()
      .where('id', '=', user_id)
  };

const createUser = async (user) => {
    return await db('profiles').insert(user)
}

const updateProfile = async (updates, userId) => {
    return await db('profiles')
      .where("id", "=", userId)
      .update(
        updates
      )
}

const deleteUser = async (id) => {
  return await db('profiles')
    .where("id", "=", id)
    .del()
}

module.exports = { 
  getCompanyUsers,
  getCompanyUser,
  createUser,
  updateProfile,
  deleteUser
};
