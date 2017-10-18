'use strict'
const router = require('express').Router()
const { Campus, Students } = require('APP/db/models')

// This helper function gets all campuses.
// REQUIRES: req, res, next from router callback function
// OPTIONAL: eagerLoad takes an obj such as: {include: [Students]}
function findAllCampuses(req, res, next, eagerLoad = {}) {
    return Campus.findAll(eagerLoad)
    .then((campuses) => {
        res.json(campuses)
    })
    .catch(next)
}

// if an id param is included in a route, pull the info for that id
// and store the info for the id in req.campus
router.param('id', (req, res, next, id) => {
    Campus.findById(id)
        .then((campus) => {
            if (campus) {
                req.campus = campus
                next()
            } else {
                const error = new Error('Campus Not Found')
				error.status = 404
				throw error
            }
        })
        .catch(next)
})

// returns an array of all campuses
// NOTE:  WITHOUT INCLUDING STUDENTS EAGER LOADING
router.get('/', (req, res, next) => {
    return findAllCampuses(req, res, next)
})

// returns an array of all campuses 
// AND eager load students
router.get('/students', (req, res, next) => {
    return findAllCampuses(req, res, next, {include: [Students]})
})

// creates a new campus and returns the new campus
router.post('/', (req, res, next) => {
    Campus.create(req.body)
        .then((newCampus) => {
            console.log("new campus created::::",newCampus)
            res.json(newCampus)
        }) 
        .catch(next)
})

// updates a campus. does not return updated campus.
router.put('/:id', (req, res, next) => {
    req.campus.update(req.body)
        .then((updatedCampus) => {
            // updatedCampus is the updated campus
            // ignored here, but is available for use.
            res.sendStatus(200)
        })
        .catch(next)
})

// deletes a campus. does not return anything
// NOTE: cascade delete is on for the campus.
//       this means associated students will also be deleted
router.delete('/:id', (req, res, next) => {
    req.campus.destroy()
        .then(() => {
            res.sendStatus(200)
        })
        .catch(next)
})

module.exports = router