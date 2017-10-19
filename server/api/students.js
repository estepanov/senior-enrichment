'use strict'
const router = require('express').Router()
const { Students, Campus } = require('APP/db/models')

// if an id param is included in a route, pull the info for that id
// and store the info for the id in req.student
router.param('id', (req, res, next, id) => {
    Students.findById(id)
        .then((student) => {
            if (student) {
                req.student = student
                next()
            } else {
                const error = new Error('Student Not Found')
				error.status = 404
				throw error
            }
        })
        .catch(next)
})

// returns an array of all students
router.get('/', (req, res, next) => {
    Students.findAll()
    .then((students) => {
        res.json(students)
    })
    .catch(next)
})

// creates a new student and returns the new student obj
router.post('/', (req, res, next) => {
    console.log("Incoming req to post a new student:\n",req.body)
    Students.create(req.body)
        .then((newStudent) => {
            res.json(newStudent)
        })
        .catch(next)
})

// updates a student. does not return updated student.
router.put('/:id', (req, res, next) => {
    req.student.update(req.body)
        .then((updatedStudent) => {
            // updatedStudent is the updated student
            // ignored here, but is available for use.
            res.sendStatus(200)
        })
        .catch(next)
})

// deletes a student. does not return anything
// NOTE: this is not a cascade delete. only student instance will be destroyed.
router.delete('/:id', (req, res, next) => {
    req.student.destroy()
        .then(() => {
            res.sendStatus(200)
        })
        .catch(next)
})

module.exports = router
