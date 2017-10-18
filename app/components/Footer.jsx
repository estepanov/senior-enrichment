import React from 'react'
import { connect } from 'react-redux'

function Footer () {

  return (
    <section>
      <hr />
      <p>- Copyright 2420</p>
    </section>
  )
}

const mapStateToProps = function (state) {
  return state
}

export default connect(mapStateToProps)(Footer);