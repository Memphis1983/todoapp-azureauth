const express = require('express')
const router = express.Router()
// importing home controller from controllers/home
const homeController = require('../controllers/home')

// home route
router.get('/', homeController.getIndex) 

module.exports = router
