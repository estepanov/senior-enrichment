'use strict'
const Sequelize = require('sequelize')
const db = require('APP/db/_db')

const Campus = db.define('Campus',{
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
    image: {
        type: Sequelize.STRING,
        allowNull: false,
        defaultValue: '/imgs/campus_default.jpg',
        validate: {
            notEmpty: true
        }
    },
    managerEmail: {
        type: Sequelize.STRING,
        allowNull: false,
        validate: {
            isEmail: true,
            notEmpty: true
        }
    }
})

module.exports = Campus