import jwt from "jsonwebtoken";
import bcrypt from "bcrypt";


exports.signup = async (req, res) => {
  const { fullName, email } = req.body;
  let { password } = req.body;
  const salt = bcrypt.genSaltSync(10);
  password = bcrypt.hashSync(password, salt);



};



exports.signin = async (req, res) => {
  
};
