'use strict'
const express = require('express')
const chalk = require('chalk')
const bodyParser = require('body-parser')
const { resolve } = require('path')

const app = express()

if (process.env.NODE_ENV !== 'production') {
  app.use(require('volleyball'))
}  

module.exports = app
  .use(bodyParser.urlencoded({ extended: true }))
  .use(bodyParser.json())
  .use(express.static(resolve(__dirname, '..', 'public'))) // Serve static files from ../public
  .use('/api', require('./api')) // Serve our api
  .get('/*', (_, res) => res.sendFile(resolve(__dirname, '..', 'public', 'index.html'))) // Send index.html for any other requests.
  .use((err, req, res, next) => {
    res.status(err.status || 500)
    res.send(err.message || 'The universe may no longer exist. We have an error that we don\'t know how to handle. ')
  })

if (module === require.main) {
  // Start listening only if we're the main module.

  const PORT = 1337

  const db = require('APP/db')

  db.sync()
  .then(() => {
    console.log(chalk.yellow('---> db synced'))
    app.listen(PORT, () => {
      const space = '\t\t\t'
      console.log(chalk.bgGreen.black.bold(
        `${space} 👽  🥊  fighting aliens on port ${PORT} 🍻  😎${space}`
      ))
    })
  });
}
