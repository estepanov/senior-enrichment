const router = require('express').Router()
const { Students, Campus } = require('APP/db/models')

router.get('/', (req, res, next) => {
    Campus.findAll()
        .then((campuses) => {
            res.json(campuses)
        })
        .catch(next)
})

module.exports = router