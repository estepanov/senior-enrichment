import React, { Component } from 'react'

import store from 'APP/app/store.jsx'
import { fetchCampuses } from 'APP/app/reducers/campuses.jsx'

import NewCampus from './NewCampus.jsx'

const CampusList = props => { 
    let mappedCampuses
    if (props.campuses.length) {
        mappedCampuses = props.campuses.map((campus) => {
            return <li key={campus.id}>{campus.name}</li>
        })
    }
    return (
    <div>
        <NewCampus />
        <hr />
        <ul>
        { mappedCampuses ? mappedCampuses : 'We currently do not have any campuses' }
        </ul>
    </div>
    )
}

export default CampusList