import React, { Component } from 'react'
import { connect } from 'react-redux'
import { Link, withRouter } from 'react-router-dom'

import { SetCampus } from 'APP/app/reducers/campuses.jsx'

import EditCampus from './EditCampus.jsx'
import NewStudent from './NewStudent.jsx'

import { fetchCampuses } from 'APP/app/reducers/campuses.jsx'
import { deleteStudent } from 'APP/app/reducers/students.jsx'

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
                    return <li key={student.id}><Link to={`/student/${student.id}`}> {student.name} </Link> - <button className="deleteButton" onClick={() => this.props.goDeleteStudent(student.id)}><i className="fa fa-trash" aria-hidden="true"></i> DELETE</button></li>
                }
            })
        }
        return mappedStudents
    }

    render () {
        const mappedStudents = this.getMappedUsers(this.props.students)
        if(this.props.currentCampus) {
            return (
            <div>
                <h2>Campus Information</h2>
                <hr />
                <div className="sameLine">
                    <h3>{this.props.currentCampus.name}</h3>
                    <button className="toggleBox" onClick={this.handleEditClick}>
                        { this.state.showEditDetails ? <span><i className="fa fa-eye-slash" aria-hidden="true"></i> Hide Edit Form</span> : <span><i className="fa fa-pencil-square" aria-hidden="true"></i> Edit Campus</span> }
                    </button>
                </div>
                { this.state.showEditDetails && <EditCampus update={this.handleEditClick} />}
                <hr />
                    <b>Address</b> {this.props.currentCampus.address}<br />
                    <b>Manager Email</b> {this.props.currentCampus.managerEmail} <br />
                    <b>Student Count</b> { mappedStudents ? this.props.currentCampus.Students.length : '0' }
                <hr />
                <ul>
                    { mappedStudents ? mappedStudents : 'We currently do not have any students' }
                </ul>
                <button className="addBox" onClick={this.handleAddStudentClick}>{ this.state.showAddStudent ? <span><i className="fa fa-eye-slash" aria-hidden="true"></i> Hide Add Form</span> : <span><i className="fa fa-user-circle-o" aria-hidden="true"></i> Add A New Student</span>}</button>
                { this.state.showAddStudent && <NewStudent update={this.handleAddStudentClick} specificId={this.props.currentCampus.id} /> }
            </div>
            )
        } else {
            return (<div>not a valid campus</div>)
        }
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

const mapDispatchToProps = (dispatch) => ({
    goDeleteStudent: (id) => dispatch(deleteStudent(id))
})

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(SingleCampus))