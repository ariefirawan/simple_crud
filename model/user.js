const db = require('../util/db');

module.exports = class User {
  constructor(email, password) {
    (this.email = email), (this.password = password);
  }

  save() {
    db.execute('INSERT INTO user(email, password) VALUES (?,?)', [
      this.email,
      this.password,
    ]);
  }

  static login(email) {
    return db.execute('SELECT * FROM user WHERE email = ?', [email]);
  }
};
