const express = require('express');
const userModel = require('./userModel');
const router = express.Router();

router.get('/:company_id/users', function (req, res) {
    userModel.getCompanyUsers(req.params.company_id)
      .then((users) => {
        res.status(200).json(users);
      })
      .catch((err) => {
        console.log(err);
        res.status(500).json({ message: "Not found" });
      });
  });

router.get('/:company_id/user/:user_id', function (req, res) {
  userModel.getCompanyUser(req.params.company_id, req.params.user_id)
        .then((user) => {
          res.status(200).json(user);
        })
        .catch((err) => {
          console.log(err);
          res.status(500).json({ message: "Not found" });
        });
})

router.post('/:company_id/user', function (req, res) {
  createUser = req.body
  userModel.createUser(createUser)
        .then((user) => {
          res.status(200).json(user);
        })
        .catch((err) => {
          console.log(err);
          res.status(500).json({ message: "Something went wrong" });
        });
})
module.exports = router;
