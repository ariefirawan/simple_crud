const db = require('../util/db');

module.exports = class Pegawai {
  constructor(nama, email, alamat, id_jab) {
    (this.nama = nama),
      (this.email = email),
      (this.alamat = alamat),
      (this.id_jab = id_jab);
  }

  save() {
    return db.execute(
      'INSERT INTO pegawai (nama_peg, email, alamat, id_jab) VALUES (?,?,?,?)',
      [this.nama, this.email, this.alamat, this.id_jab]
    );
  }

  static update(edit, id) {
    return db.execute(
      'UPDATE pegawai SET nama_peg= ?, email=?, alamat=?, id_jab=?  WHERE id_peg = ?',
      [edit.nama_peg, edit.email, edit.alamat, edit.id_jab, id]
    );
  }

  static getDataPeg() {
    return db.execute(
      'SELECT pegawai.id_peg, pegawai.nama_peg, pegawai.email, pegawai.alamat,jabatan.id, jabatan.nama_jab FROM pegawai JOIN jabatan ON pegawai.id_jab = jabatan.id'
    );
  }

  static delete(id) {
    return db.execute('DELETE FROM pegawai WHERE id_peg = ?', [id]);
  }

  static dataId(id) {
    return db.execute('SELECT * FROM pegawai WHERE id_peg = ?', [id]);
  }

  static emailValid(email) {
    return db.execute('SELECT * FROM pegawai WHERE email = ?', [email]);
  }
};
