const router = require('express').Router()
const { Students, Campus } = require('APP/db/models')

router.get('/', (req, res, next) => {
    res.json({key:'val'})
})

module.exports = router
