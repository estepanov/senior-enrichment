import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import { connect } from 'react-redux'

import store from 'APP/app/store.jsx'
import { deleteCampus } from 'APP/app/reducers/campuses.jsx'

import NewCampus from './NewCampus.jsx'

class CampusList extends React.Component {
    constructor (props) {
        super(props)
        this.state = {
            showAddCampus: false,
            showEditCampus: false
        }
        this.toggleAddCampus = this.toggleAddCampus.bind(this)
    }

    toggleAddCampus(event) {
        event.preventDefault()
        this.setState({showAddCampus: !this.state.showAddCampus})
        console.log(this.state)
    }

    mappedCampuses(allCampuses) {
        let mappedCampuses
        if (allCampuses.length) {
            mappedCampuses = allCampuses.map((campus) => {
                return <li key={campus.id}><Link to={`/campus/${campus.id}`}>{campus.name}</Link> - <button className="deleteButton" onClick={() => this.props.goDeleteCampus(campus.id)}><i className="fa fa-trash" aria-hidden="true"></i> DELETE</button></li>
            })
        }
        return mappedCampuses
    }

    render () { 
        let mappedCampuses = this.mappedCampuses(this.props.campuses)
        return (
        <div>
            <div className="sameLine">
                <h2>All Campuses</h2>
                <button className="addBox" onClick={this.toggleAddCampus}>
                    { this.state.showAddCampus ? <span><i className="fa fa-eye-slash" aria-hidden="true"></i> Hide Add Form</span> : <span><i className="fa fa-graduation-cap" aria-hidden="true"></i> Add A Campus</span> }
                </button>
            </div>
            { this.state.showAddCampus && <NewCampus /> }
            <hr />
            <ul>
            { mappedCampuses ? mappedCampuses : 'We currently do not have any campuses' }
            </ul>
        </div>
        )
    }
}

const mapStateToProps = (state, ownProps) => ({
    campuses: state.campuses.campusesList,
    students: state.students.studentsList
})

const mapDispatchToProps = (dispatch) => ({
    goDeleteCampus: (id) => dispatch(deleteCampus(id))
})

export default connect(mapStateToProps, mapDispatchToProps)(CampusList)