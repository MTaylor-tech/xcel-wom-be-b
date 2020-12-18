const db = require('../../data/db-config');

const getCompanyUsers = async (id) => {
    return await db('users')
      .select()
      .where('company_id', '=', id)    
  };

const getCompanyUser = async (company_id, user_id) => {
    return await db('users')
      .select()
      .where('id', '=', user_id)
      
  };

const createUser = async (user) => {
    return await db('users').insert(user)
}

module.exports = { 
  getCompanyUsers,
  getCompanyUser,
  createUser
};
