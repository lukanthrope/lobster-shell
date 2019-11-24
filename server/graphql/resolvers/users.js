const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const { UserInputError } = require('apollo-server');

const { validateRegisterInput, validateLoginInput } = require('../../utils/validators');
const { SECRET_KEY } = require('../../config');
const User = require('../../models/User');

const generateToken = (user) => {
  return jwt.sign({
    id: user.id,
    email: user.email,
    username: user.username,
  }, SECRET_KEY, { expiresIn: '1h' });
};

module.exports = {
  Mutation: {
    async login(_, { email, password }) {
      const { errors, valid } = validateLoginInput(email, password);

      if (!valid) {
        throw new UserInputError('Check out the fields', { errors });
      }

      const user = await User.findOne({ email });
      
      if (!user) {
        errors.general = 'wrong credencials';
        throw new UserInputError('wrong credencials', { errors });
      } 

      const match = await bcrypt.compare(password, user.password);

      if (!match) {
        errors.general = 'wrong credencials';
        throw new UserInputError('wrong credencials', { errors });
      }

      const token = generateToken(user);
      
      return {
        ...user._doc,
        id: user._id,
        token,
      }
    },
    async register(
      parent, 
      {
        registerInput: { username, email, password, confirmPassword }
      }, 
      context, 
      info) {
      // TODO: validate user data
      const { valid, errors } = validateRegisterInput(username, email, password, confirmPassword);
      
      if (!valid) {
        throw new UserInputError('Errors', { errors });
      }
      // TODO: make surer user doen't exist
      const mail = await User.findOne({ email });
      if (mail) {
        throw new UserInputError('email is already in use', {
          errors: {
            email: 'email is already in use' + mail,
          }
        });
      }
      // TODO: hash password and create an auth token
      password = await bcrypt.hash(password, 12);

      const newUser = new User({
        email,
        username,
        password,
        createdAt: new Date().toISOString()
      });
      const res = await newUser.save();
      const token = generateToken(res);

      return {
        ...res._doc,
        id: res._id,
        token,
      };
    }
  }
};