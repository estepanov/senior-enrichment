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

    render () { 
        let mappedCampuses
        if (this.props.campuses.length) {
            mappedCampuses = this.props.campuses.map((campus) => {
                return <li key={campus.id}><Link to={`/campus/${campus.id}`}>{campus.name}</Link> - <button onClick={() => this.props.goDeleteCampus(campus.id)}>DELETE</button></li>
            })
        }
        return (
        <div>
            <button onClick={this.toggleAddCampus}>{ this.state.showAddCampus ? 'Hide Form' : 'Add A New Campus' }</button>
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