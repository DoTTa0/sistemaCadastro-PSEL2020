const express = require('express');
const router = express.Router();
const multer = require('multer')
const path = require('path')
const crypto = require('crypto')

const upload = multer({storage:multer.diskStorage({
    destination: (req, res, cb) => {
        cb(null, 'uploads/images/')
    },
    filename: (req, res, cb) => {
        crypto.randomBytes(16, (error, hash) => {
          if(error) cb(error);

          const fileName = `${hash.toString('hex')}-${res.originalname}`

          cb(null,fileName)
        })
    }
    })
})
// Colocar controller que ainda não foi criado
const UserController = require('../controllers/UserController.js');
// teste simples
router.get('/users', UserController.listAll);
router.post('/register', upload.single('file'), UserController.register);
router.post('/login', UserController.login);
router.get('/user/:id', UserController.showOne);
router.put('/edit/:id', UserController.edit);
router.delete('/delete/:id', UserController.delete);
router.patch('/status/:id', UserController.statusUser);
router.post('/email', UserController.checkEmail);
router.post('/cpf', UserController.checkCpf);
module.exports = router;