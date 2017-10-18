import React from 'react'
import { connect } from 'react-redux'

function Header () {

  return (
    <section>
        <nav>
            <h3>Master Chief University </h3>
        </nav>
        <hr />
    </section>
  )
}

const mapStateToProps = function (state) {
  return state
}

export default connect(mapStateToProps)(Header)