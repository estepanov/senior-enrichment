import React, { Component } from 'react'
import { connect } from 'react-redux'
import { Link, withRouter } from 'react-router-dom'

import { SetCampus } from 'APP/app/reducers/campuses.jsx'

import EditCampus from './EditCampus.jsx'
import NewStudent from './NewStudent.jsx'

import { fetchCampuses } from 'APP/app/reducers/campuses.jsx'
import { fetchStudents } from 'APP/app/reducers/students.jsx'

class SingleCampus extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            showAddStudent: false,
            showEditDetails: false
        }
        this.handleEditClick = this.handleEditClick.bind(this)
        this.handleAddStudentClick = this.handleAddStudentClick.bind(this)
    }

    // toggles the visibility of edit form
    handleEditClick(e) {
        if(e) e.preventDefault()
        this.setState({showEditDetails: !this.state.showEditDetails})
    }

    // toggles the visibility of add student form
    handleAddStudentClick(e) {
        if(e) e.preventDefault()
        this.setState({showAddStudent: !this.state.showAddStudent})
    }

    // helper function that maps students to LI elements
    getMappedUsers(allStudents) {
        let mappedStudents = []
        if(allStudents) {
            mappedStudents = allStudents.map((student) => {
                if(student.CampusId === this.props.currentCampus.id) {
                    return <li key={student.id}><Link to={`/student/${student.id}`}> {student.name} </Link></li>
                }
            })
        }
        return mappedStudents
    }

    render () {
        const mappedStudents = this.getMappedUsers(this.props.students)
        const currName = this.props.currentCampus ? this.props.currentCampus.name : 'not a valid campus'
        return (
        <div>
            <h2>{currName} <button onClick={this.handleEditClick}>{ this.state.showEditDetails ? 'Hide Edit' : 'Edit Campus' }</button></h2>
            { this.state.showEditDetails && <EditCampus update={this.handleEditClick} />}
            <ul>
                { mappedStudents ? mappedStudents : 'We currently do not have any students' }
            </ul>
            <button onClick={this.handleAddStudentClick}>{ this.state.showAddStudent ? 'Hide Add Student' : 'Add Student'}</button>
            { this.state.showAddStudent && <NewStudent update={this.handleAddStudentClick} specificId={this.props.currentCampus.id} /> }
        </div>
        )
    }
}


const mapStateToProps = (state, ownProps) => {
    const currCampId = parseInt(ownProps.match.params.campusId)
    const currCampObj = state.campuses.campusesList.find(campus => campus.id === currCampId)

    return {
        campuses: state.campuses.campusesList,
        currentCampus: currCampObj,
        students: state.students.studentsList
    }
}

export default withRouter(connect(mapStateToProps )(SingleCampus))