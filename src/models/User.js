const knex = require('../../connections/database');
const crypto = require('bcrypt');
require('dotenv').config();


const salt = parseInt(process.env.BCRYPT_SALT);

class User {
  async create(username, email, password) {
    let hash = await crypto.hash(password, salt);
    let userData = {
      username: username,
      email: email,
      hash_password: hash
    };
    try {
      await knex('users').insert(userData);
      return {status: true, error: undefined}
    } catch (error) {
      console.log(error);
      return {status: false, error: error}
    }
    
  }

  async findEmail(email) {
    try {
      let emailExist = await knex('users').select().where({email: email});
      

      if (emailExist.length != 0) {
        return {status: true, msg: "Email already exist"};
      }
      else {
        return {status: false, msg: undefined}
      }
    } catch (error) {
      return {status: true, msg: error}
    }
  }

  async findByEmail(email) {
    try {
      let user = await knex('users').select().where({email: email});      

      if (user.length == 0) {        
        return {status: false, data: "User not found"};
      }

      return {status: true, data: user[0]};
      
      
    } catch (error) {
      return {status: false, data: error};
    }
  }

}

module.exports = new User;