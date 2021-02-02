const express = require('express');
const authRequired = require('../middleware/authRequired');
const Companies = require('./companyModel');
const router = express.Router();

/**
 * @swagger
 * /companies:
 *  get:
 *    description: Returns a list of all companies
 *    summary: Get a list of all companies
 *    security:
 *      - okta: []
 *    tags:
 *      - company
 *    responses:
 *      200:
 *        description: array of companies
 *        content:
 *          application/json:
 *            schema:
 *              type: array
 *              items:
 *                $ref: '#/components/schemas/company'
 *      401:
 *        $ref: '#/components/responses/UnauthorizedError'
 *      403:
 *        $ref: '#/components/responses/UnauthorizedError'
 *  post:
 *    summary: Add a company
 *    security:
 *      - okta: []
 *    tags:
 *      - company
 *    requestBody:
 *      description: company object to to be added (minus id)
 *      content:
 *        application/json:
 *          schema:
 *            $ref: '#/components/schemas/company'
 *    responses:
 *      400:
 *        $ref: '#/components/responses/BadRequest'
 *      401:
 *        $ref: '#/components/responses/UnauthorizedError'
 *      404:
 *        $ref: '#/components/responses/NotFound'
 *      200:
 *        description: The new company object
 *        content:
 *          application/json:
 *            schema:
 *              type: object
 *              properties:
 *                message:
 *                  type: string
 *                  description: A message about the result
 *                  example: company created
 *                company:
 *                  $ref: '#/components/schemas/company'
 */
router
  .route('/')
  .all(authRequired)
  .get(function (req, res) {
    Companies.findAll()
      .then((companies) => {
        res.status(200).json(companies);
      })
      .catch((err) => {
        console.log(err);
        res.status(500).json({ message: err.message });
      });
  })
  .post(async function (req, res) {
    const company = req.body;
    if (company) {
      const id = company.id || 0;
      try {
        await Companies.findById(id).then(async (pf) => {
          if (pf == undefined) {
            //company not found so lets insert it
            await Companies.create(company).then((company) =>
              res
                .status(200)
                .json({ message: 'company created', company: company[0] })
            );
          } else {
            res.status(400).json({ message: 'company already exists' });
          }
        });
      } catch (e) {
        console.error(e);
        res.status(500).json({ message: e.message });
      }
    } else {
      res.status(404).json({ message: 'Company missing' });
    }
  });

/**
 * @swagger
 * /companies/{companyId}:
 *  get:
 *    description: Returns the specified company object
 *    summary: Get a specified company object
 *    security:
 *      - okta: []
 *    tags:
 *      - company
 *    parameters:
 *      - $ref: '#/components/parameters/companyId'
 *    responses:
 *      200:
 *        description: company object
 *        content:
 *          application/json:
 *            schema:
 *              $ref: '#/components/schemas/company'
 *      401:
 *        $ref: '#/components/responses/UnauthorizedError'
 *      403:
 *        $ref: '#/components/responses/UnauthorizedError'
 *      404:
 *        $ref: '#/components/responses/NotFound'
 *  put:
 *    summary: Update a company
 *    security:
 *      - okta: []
 *    tags:
 *      - company
 *    requestBody:
 *      description: company object to to be updated or portion
 *      content:
 *        application/json:
 *          schema:
 *            $ref: '#/components/schemas/company'
 *    parameters:
 *      - $ref: '#/components/parameters/companyId'
 *    responses:
 *      401:
 *        $ref: '#/components/responses/UnauthorizedError'
 *      404:
 *        $ref: '#/components/responses/NotFound'
 *      200:
 *        description: A company object
 *        content:
 *          application/json:
 *            schema:
 *              type: object
 *              properties:
 *                message:
 *                  type: string
 *                  description: A message about the result
 *                  example: company updated
 *                company:
 *                  $ref: '#/components/schemas/company'
 *  delete:
 *    summary: Remove a company
 *    security:
 *      - okta: []
 *    tags:
 *      - company
 *    parameters:
 *      - $ref: '#/components/parameters/companyId'
 *    responses:
 *      401:
 *        $ref: '#/components/responses/UnauthorizedError'
 *      404:
 *        $ref: '#/components/responses/NotFound'
 *      200:
 *        description: A company object
 *        content:
 *          application/json:
 *            schema:
 *              type: object
 *              properties:
 *                message:
 *                  type: string
 *                  description: A message about the result
 *                  example: company 3 was deleted.
 *                company:
 *                  $ref: '#/components/schemas/company'
 */
router.put(['/', '/:id'], authRequired, function (req, res) {
  const company = req.body;
  if (company) {
    let id = 0;
    if (req.params.id) {
      id = req.params.id;
    } else if (company.id) {
      id = company.id;
    }
    Companies.findById(id)
      .then(
        Companies.update(id, company)
          .then((updated) => {
            res
              .status(200)
              .json({ message: 'company updated', company: updated[0] });
          })
          .catch((err) => {
            res.status(500).json({
              message: `Could not update company '${id}'`,
              error: err.message,
            });
          })
      )
      .catch((err) => {
        res.status(404).json({
          message: `Could not find company '${id}'`,
          error: err.message,
        });
      });
  }
});

router
  .route('/:id')
  .all(authRequired)
  .get(function (req, res) {
    const id = String(req.params.id);
    Companies.findById(id)
      .then((company) => {
        if (company) {
          res.status(200).json(company);
        } else {
          res.status(404).json({ error: 'CompanyNotFound' });
        }
      })
      .catch((err) => {
        res.status(500).json({ error: err.message });
      });
  })
  .delete(function (req, res) {
    const id = req.params.id;
    try {
      Companies.findById(id).then((company) => {
        Companies.remove(company.id).then(() => {
          res.status(200).json({
            message: `Company '${id}' was deleted.`,
            company: company,
          });
        });
      });
    } catch (err) {
      res.status(500).json({
        message: `Could not delete company with ID: ${id}`,
        error: err.message,
      });
    }
  });

/**
 * @swagger
 * /companies/{companyId}/roles:
 *  get:
 *    description: Returns an array of the company roles
 *    summary: Returns an array of the company roles
 *    security:
 *      - okta: []
 *    tags:
 *      - company
 *      - role
 *    parameters:
 *      - $ref: '#/components/parameters/companyId'
 *    responses:
 *      200:
 *        description: array of roles
 *        content:
 *          application/json:
 *            schema:
 *              type: array
 *              items:
 *                $ref: '#/components/schemas/role'
 *      401:
 *        $ref: '#/components/responses/UnauthorizedError'
 *      403:
 *        $ref: '#/components/responses/UnauthorizedError'
 *      404:
 *        $ref: '#/components/responses/NotFound'
 */

/**
 * @swagger
 * /companies/roles/{code}:
 *  get:
 *    description: Returns the role associated with the code
 *    summary: Returns the role associated with the code
 *    security:
 *      - okta: []
 *    tags:
 *      - company
 *      - role
 *    parameters:
 *      - $ref: '#/components/parameters/code'
 *    responses:
 *      200:
 *        description: role object
 *        content:
 *          application/json:
 *            schema:
 *              $ref: '#/components/schemas/role'
 *      401:
 *        $ref: '#/components/responses/UnauthorizedError'
 *      403:
 *        $ref: '#/components/responses/UnauthorizedError'
 *      404:
 *        $ref: '#/components/responses/NotFound'
 */

module.exports = router;
