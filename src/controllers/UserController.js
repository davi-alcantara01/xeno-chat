const User = require('../models/User');
const crypto = require('bcrypt');
const jwt = require('jsonwebtoken');


const secretKey = process.env.JWT_SECRET_KEY;

function validate(email, username, password) {
  if (email == undefined || email.trim() === '') {
    return {status: false, error: "Email is required"};
  }
  if (username == undefined || username.trim() === '') {
    return {status: false, error: "Username is required"};
  }
  if (password == undefined || password.trim() === '') {
    return {status: false, error: "Password is required"};
  }
  return {status: true, error: undefined}
}

class UserController {
  async create(req, res) {
    let {username, email, password} = req.body;

    let result = validate(email, username, password);

    if (result.status == false) {
      res.status(400);
      res.json({error: result.error});
      return
    }

    let emailExist = await User.findEmail(email);

    if (emailExist.status == true) {
      res.status(400);
      res.json({error: emailExist.msg});
      return
    }


    try {

      await User.create(username, email, password);
      console.log('Usuario Criado');
      res.json({msg: "User create successfully"});
    } catch (error) {
      console.log(error);
      res.json({error: error});
    }

  }

  async login(req, res) {
    let { email, password } = req.body;
    

    let verify = validate(email, 'void', password);

    if (verify.status == false) {
      res.status(404);
      res.json({error: verify.error});
      return
    }

    let user = await User.findByEmail(email);

    if (user.status == false) {
      res.status(404);
      res.json({error: user.data});
      return
    }

    user = user.data;

    let match = await crypto.compare(password, user.hash_password);

    if (!match) {
      res.status(400);
      res.json({error: "Invalid password"});
    } else {

      let token = jwt.sign(user, secretKey);


      res.json({msg: "Login successful", user: user, token: token});
    }

  }

  async verifyToken(req, res) {
    let { token } = req.body;

    if (token == undefined) {
      res.status(400);
      res.json({error: "Token is required"})
      return
    }

    try {
      let user = jwt.decode(token);
    } catch (error) {
      res.status(400);
      res.json({error: "Invalid token"});
      return
    }
    let user = jwt.decode(token);
    
    

    let userDB = await User.findByEmail(user.email);
    if (userDB.status == false) {
      res.status(404);
      res.json({error: userDB.data});
      return
    }

    res.json({msg: "Login successful"});
  
  }
};


module.exports = new UserController;