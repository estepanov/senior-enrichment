import React, { Component } from 'react'
import { Route, Switch, Redirect } from 'react-router-dom'

import Header from './Header.jsx'
import Footer from './Footer.jsx'

export default class Uni extends Component {
  constructor() {
    super()
  }

  componentDidMount() {
  }

  render() { 
    return (
      <div>
        <Header />
        <Switch>
          <p>Tell me</p>
        </Switch>
        <Footer />
      </div>
    )
  }
}