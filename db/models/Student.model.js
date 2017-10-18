'use strict'
const Sequelize = require('sequelize')
const db = require('APP/db/_db')

const Students = db.define('Student', {
    name: {
        type: Sequelize.STRING,
        allowNull: false,
        validate: {
            notEmpty: true
        }
    },
    address: {
        type: Sequelize.STRING,
        allowNull: false,
        validate: {
            notEmpty: true
        }
    },
    email : {
        type: Sequelize.STRING,
        allowNull: false,
        validate: {
            isEmail: true,
            notEmpty: true
        }
    },
    image: {
        type: Sequelize.STRING,
        defaultValue: '/imgs/student_default.jpg',
        validate: {
            notEmpty: true
        }
    }
})

module.exports = Students