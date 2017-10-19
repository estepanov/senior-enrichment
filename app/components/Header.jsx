import React from 'react'
import { connect } from 'react-redux'
import { withRouter, NavLink } from 'react-router-dom'

const Header = props => {
  const campusCount = props.campuses.length
  const studentCount = props.students.length
  return (
    <section className="container">
        <nav className="headerBar">
          <span className="title">Master Chief University </span>
          <div className="NavLinks">
            <NavLink to="/">Home</NavLink>
            <NavLink to="/campus">Campuses<span className="badge nounderline">{ campusCount }</span></NavLink>
            <NavLink to="/student">Students<span className="badge nounderline">{ studentCount }</span></NavLink> 
          </div>
        </nav>
    </section>
  )
}


export default Header