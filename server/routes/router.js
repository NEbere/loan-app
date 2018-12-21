// Third party imports
const router = require('express').Router()
const lodash = require('lodash')
const sequelize = require('sequelize')

// Local imports
const config = require('../utils/config.json')
const {
  getHttpRequestPromise
} = require('../utils/services')

// models
const Loan = require('../models').loan
const Note = require('../models').note
const Op = sequelize.Op

/**
 * Health check endpoint: Used to run a health check on ther server endpoints
 */
router.get('/_health', (req, res) => {
  res.status(200).send({ message: 'ok' })
})

// GET loan by dueDate or bankName OR get all loans if no query param
// GET /loans get all loans
// GET /loans?bankName=Banco returns loans where bank name contains the string provided in query
// GET /loans?dueDate=2019-02-25 returns loans by due date
router.get('/loans', async (req, res) => {
  const requestQuery = req.query
  let loans

  if (requestQuery.dueDate){
    const dateParam = requestQuery.dueDate
    loans = await Loan.findAll({
      where: { dueDate: {
        [Op.eq]:  new Date(dateParam)
      } }
    })
  } else if (requestQuery.bankName){
    const bankNameParam = requestQuery.bankName
    loans = await Loan.findAll({
      where: { bankName: {
        [Op.iLike]:  `%${bankNameParam}%`
      } }
    })
  } else {
    loans = await Loan.findAll()
  }

  res.status(200).send({ loans })
})

// GET loan by ID
// GET /loan/1 returns a loan and its notes
router.get('/loan/:id', async (req, res) => {
  const loanId = parseInt(req.params.id, 10)
  const loan = await Loan.findById(loanId, {
    include: [ 
      { model: Note, as: 'notes' }
    ]
  })
  res.status(200).send({ loan })
})

// POST loan

router.post('/loan', async (req, res) => {
  const requestBody = req.body
  const response = await Loan.create(requestBody)
  res.status(200).send({ response: response })
})

// Add notes to a loan
router.post('/loan/:loanId/note', async (req, res) => {
  const loanId = parseInt(req.params.loanId, 10)
  const loan = await Loan.findById(loanId)
  const note = req.body
  const loanNote = await loan.createNote(note)
  res.status(200).send({ responseData: "test data", loanNote })
})


// Edit a loan
router.put('/loan/:id', async (req, res) => {
  const loanId = parseInt(req.params.id, 10)
  const requestBody = req.body

  const loan = await Loan.findById(loanId)
  const response = await loan.update(requestBody)
  res.status(200).send({ response })
})

// Delete a loan
router.delete('/loan/:id', async (req, res) => {
  const loanId = parseInt(req.params.id, 10)

  const loan = await Loan.findById(loanId)
  const response = await loan.destroy()
  res.status(200).send({ response: response })
})

// Add more money to loan.
// Route to update loan partial payment

module.exports = router
