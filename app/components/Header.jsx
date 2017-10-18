import React from 'react'
import { connect } from 'react-redux'
import { withRouter, NavLink } from 'react-router-dom'

const Header = props => {
  const spacer = ' | '
  const campusCount = props.campuses.length
  const studentCount = props.students.length
  return (
    <section>
        <nav>
            <h3>Master Chief University </h3>
            <NavLink to="/">Home</NavLink> {spacer}
            <NavLink to="/campuses">Campuses<span className="badge nounderline">{ campusCount }</span></NavLink> {spacer}
            <NavLink to="/students">Students<span className="badge nounderline">{ studentCount }</span></NavLink> 
        </nav>
        <hr />
    </section>
  )
}


export default Header