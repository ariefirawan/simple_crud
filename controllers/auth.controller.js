const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const User = require('../model/user');

exports.login = (req, res, next) => {
  const { email, password } = req.body;
  let loadedUser;
  User.login(email)
    .then((user) => {
      loadedUser = user[0][0];
      if (!loadedUser) {
        const error = new Error('User tidak ditemukan');
        error.statusCode = 401;
        throw error;
      }
      return bcrypt.compare(password, loadedUser.password);
    })
    .then((isEqual) => {
      if (!isEqual) {
        const error = new Error('Wrong Password');
        error.statusCode = 401;
        throw error;
      }

      const token = jwt.sign(
        {
          email: loadedUser.email,
        },
        'secretskb',
        { expiresIn: '5h' }
      );
      res
        .status(200)
        .json({ token: token, userId: loadedUser.id, isAuth: true });
    });
};

exports.register = (req, res, next) => {
  const { email, password } = req.body;
  bcrypt
    .hash(password, 12)
    .then((hashedPw) => {
      const user = new User(email, hashedPw);
      return user.save();
    })
    .then(() => {
      res.status(201).json({ message: 'User created!' });
    })
    .catch((err) => {
      if (!err.statusCode) {
        err.statusCode = 500;
      }
      next(err);
    });
};
