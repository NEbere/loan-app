// Third party imports
const router = require('express').Router()
const lodash = require('lodash')

// Local imports
const config = require('../utils/config.json')
const {
  getHttpRequestPromise
} = require('../utils/services')

// models
const Loan = require('../models').loan
const Note = require('../models').note
const models = require('../models')

/**
 * Health check endpoint: Used to run a health check on ther server endpoints
 */
router.get('/_health', (req, res) => {
  res.status(200).send({ message: 'ok' })
})

// POST loan
router.post('/loan', async (req, res) => {
  const requestBody = req.body
  const response = await Loan.create(requestBody)
  res.status(200).send({ response: response })
})

router.post('/loan/:id/note', async (req, res) => {
  const loanId = parseInt(req.params.id, 10)
  const note = req.body
  note['createdAt'] = new Date()
  // const response = await Note.create(note)
  const loan = await Loan.findById(loanId)
  const data = await loan.createNote(note)

  // then((loan) => {
  //   loan.createNote(note).then(success => {
  //   })
  //   console.log(new Note(note), 'new note')
  //   // console.log(loan, loan.addNote, 'loan and addnote func')
  // }).catch(error => {
  //   console.log(error, 'error creating note')
  // })


  // .addNote(note)
  // console.log(loan.createNote, 'loan.prototype')
  // const response = await Loan.createNote(note)

  console.log(Loan.prototype, 'note.prototype')
  // console.log(Loan.prototype.createNote, 'loan.prototype.createNote')
  // const notePrototype = await Note.prototype
  res.status(200).send({ responseData: "test data", data })
})

// GET loans
router.get('/loans', async (req, res) => {
  const loans = await Loan.findAll({order: [['id', 'DESC']]})
  res.status(200).send({ loans: loans })
})


// GET loan by ID
// TODO get loan with notes
router.get('/loans/:id', async (req, res) => {
  const loanId = parseInt(req.params.id, 10)
  const loan = await Loan.findById(loanId)
  // console.log(Loan.prototype)
  console.log(loan.getNotes())
    // { include: { model: Note, as: 'note' } })

  res.status(200).send({ loan: loan })
})

/**
 * GET all product shared between the provided exchanges,['BNB', 'BTX', 'BFX']
 */
router.get('/products', (req, res) => {
  const promises = config.EXCHANGES.map((exchange) => {
    const options = {
      host: config.BASE_URL,
      method: 'GET',
      path: `/api/exchanges/${exchange}/products`,
      headers: {
        'Authorization': `Bearer ${config.MONEEDA_TOKEN}`
      }
    }

    return getHttpRequestPromise(options)
  })

  // Resolve all promises
  Promise.all(promises)
    .then(result => {
      const productsIntersection = lodash.intersectionBy(...result, 'id')
      res.send({ products: productsIntersection })
    }).catch(error => {
      res.send({ error: error })
    })
})

/**
 * GET the prices for a product on all provided exchanges, ['BNB', 'BTX', 'BFX']
 */
router.get('/products/:PRODUCT/prices', (req, res) => {
  const product = req.params.PRODUCT
  const promises = config.EXCHANGES.map((exchange) => {
    const options = {
      host: config.BASE_URL,
      method: 'GET',
      path: `/api/exchanges/${exchange}/ticker?product=${product}`,
      headers: {
        'Authorization': `Bearer ${config.MONEEDA_TOKEN}`
      }
    }

    return getHttpRequestPromise(options)
  })

  Promise.all(promises)
    .then(result => {
      const response = []
      config.EXCHANGES.forEach((exchange, i) => {
        let product = { exchange: exchange, price: result[i] }
        response.push(product)
      })
      res.send({ response: response })
    }).catch(error => {
      res.send({ error: error })
    })
})

module.exports = router
