import React, { Component } from 'react'
import { connect } from 'react-redux'
// import { withRouter, NavLink } from 'react-router-dom'

import store from 'APP/app/store.jsx'
import { fetchCampuses } from 'APP/app/reducers/campuses.jsx'

const CampusList = props => { 
    let mappedCampuses
    if (props.campuses.length >= 1) {
    mappedCampuses = props.campuses.map((campus) => {
        return <li key={campus.id}>{campus.name}</li>
    })
    }
    return (
    <div>
        <ul>
        { mappedCampuses ? mappedCampuses : '' }
        </ul>
    </div>
    )
}

export default CampusList