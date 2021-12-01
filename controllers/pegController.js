const Pegawai = require('../model/pegawai');
const { validationResult } = require('express-validator');

exports.getDataAll = async (req, res, next) => {
  const data = await Pegawai.getDataPeg();
  return res.json(data[0]);
};

exports.savePeg = async (req, res, next) => {
  try {
    const { nama_peg, alamat, email, id_jab } = req.body;
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      const error = new Error('Validation Failed');
      error.statusCode = 422;
      error.data = errors.array();
      throw error;
    }

    const pegawai = new Pegawai(nama_peg, email, alamat, id_jab);
    const data = await pegawai.save();
    return res.json(data[0]);
  } catch (error) {
    next(error);
  }
};

exports.updatePeg = async (req, res, next) => {
  const { nama_peg, alamat, email, id_jab } = req.body;
  const id = req.params.id;

  const edit = {
    nama_peg: nama_peg,
    alamat: alamat,
    email: email,
    id_jab: id_jab,
  };

  const data = await Pegawai.update(edit, id);
  return res.json(data);
};

exports.delPeg = async (req, res, next) => {
  const id = req.params.id;
  const data = await Pegawai.delete(id);
  return res.json(data[0]);
};

exports.getById = async (req, res, next) => {
  const id = req.params.id;
  const data = await Pegawai.dataId(id);
  return res.json(data[0]);
};
