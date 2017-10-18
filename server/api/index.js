'use strict'
const router = require('express').Router()

router.use('/students',require('./students'))
router.use('/campus',require('./campus'))

// Send 404 when trying to hit api routes that do not exist.
router.use((req, res, next) => {
    res.sendStatus(404)
})

module.exports = router