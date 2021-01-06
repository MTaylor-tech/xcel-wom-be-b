const express = require('express');
const userModel = require('./userModel');
const router = express.Router();
const authRequired = require('../middleware/authRequired');

router.get('/:company_id/users', authRequired, function (req, res) {
  userModel
    .getCompanyUsers(req.params.company_id)
    .then((users) => {
      res.status(200).json(users);
    })
    .catch((err) => {
      console.log(err);
      res.status(500).json({ message: 'Something went wrong', err });
    });
});

router.get('/:company_id/user/:user_id', function (req, res) {
  userModel
    .getCompanyUser(req.params.company_id, req.params.user_id)
    .then((user) => {
      res.status(200).json(user);
    })
    .catch((err) => {
      console.log(err);
      res.status(500).json({ message: 'user not found', err });
    });
});

router.post('/:company_id/user', function (req, res) {
  const createUser = req.body;
  userModel
    .createUser(createUser)
    .then((user) => {
      res.status(200).json(user);
    })
    .catch((err) => {
      console.log(err);
      res.status(500).json({ message: 'Something went wrong', err });
    });
});

router.put('/user/:user_id', function (req, res) {
  const updates = req.body;
  console.log(updates);
  userModel
    .updateProfile(updates, req.params.user_id)
    .then((user) => {
      res.status(200).json({ message: req.body, user });
    })
    .catch((err) => {
      console.log(err);
      res.status(500).json({ message: 'Unable to update', err });
    });
});

router.delete('/:company_id/user/:user_id', function (req, res) {
  userModel
    .deleteUser(req.params.user_id)
    .then(() => {
      res.status(200).json({ message: 'Deleted' });
    })
    .catch((err) => {
      console.log(err);
      res.status(500).json({ message: 'Something went wrong', err });
    });
});

module.exports = router;
