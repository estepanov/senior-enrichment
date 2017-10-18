'use strict'

const Students = require('./Student.model')
const Campus = require('./Campus.model')

Campus.hasMany(Students,{
	onDelete: 'cascade',
	hooks: true
})

Students.belongsTo(Campus)

module.exports = { Students, Campus }
