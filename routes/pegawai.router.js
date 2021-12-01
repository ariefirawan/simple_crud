const { body } = require('express-validator');
const Pegawai = require('../model/pegawai');
const express = require('express');
const router = express.Router();

const isAuth = require('../middleware/isAuth');
const pegawaiController = require('../controllers/pegController');

router.get(
  '/',
  isAuth,
  pegawaiController.getDataAll
);
router.get('/pegawai/:id', pegawaiController.getById);
router.post(
  '/add',
  isAuth,
  [
    body('email')
      .isEmail()
      .withMessage('Masukkan Valid Email')
      .custom((value) => {
        return Pegawai.emailValid(value).then((data) => {
          if (data) {
            return Promise.reject('Email sudah ada');
          }
        });
      })
      .normalizeEmail(),
  ],
  pegawaiController.savePeg
);
router.patch('/update/:id', pegawaiController.updatePeg);
router.delete('/delete/:id', pegawaiController.delPeg);

module.exports = router;
