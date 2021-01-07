const userModel = require('../userCrud/userModel');

const companyIdCheck = async (req, res, next) => {
  try {
    const company = userModel.getCompany(req.params.company_id);
    if (company) {
      next();
    } else {
      res.status(500).json({ message: "Company doesn't exists" });
    }
  } catch (err) {
    next(err);
  }
};

module.exports = companyIdCheck;
