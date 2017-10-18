'use strict'
const router = require('express').Router()

router.use('/students',require('./students'))
router.use('/campus',require('./campus'))

module.exports = router