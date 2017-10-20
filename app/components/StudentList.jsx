import React, { Component } from 'react'
import { connect } from 'react-redux'
import store from 'APP/app/store.jsx'
import { Link } from 'react-router-dom'

import NewStudent from './NewStudent.jsx'

import { deleteStudent } from 'APP/app/reducers/students.jsx'

class StudentList extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            showAddUser: false
        }
        this.toggleAddStudent = this.toggleAddStudent.bind(this)
    }

    // toggles the add student form
    toggleAddStudent(event) {
        event.preventDefault()
        this.setState({showAddUser: !this.state.showAddUser})
    }

    // maps students to LI elements
    mapStudents(allStudents) {
        let mappedStudents
        if (allStudents.length) {
            mappedStudents = allStudents.map((student) => {
                return <li key={student.id}><Link to={`/student/${student.id}`}>{student.name}</Link> - <button className="deleteButton" onClick={() => this.props.goDeleteStudent(student.id)}><i className="fa fa-trash" aria-hidden="true"></i> DELETE</button></li>
            })
        }
        return mappedStudents
    }

    render () { 
        const mappedStudents = this.mapStudents(this.props.students)
        return (
            <div>
                <div className="sameLine"><h2>All Students</h2> <button className="addBox" onClick={this.toggleAddStudent}>{ this.state.showAddUser ? <span><i className="fa fa-eye-slash" aria-hidden="true"></i> Hide Add Form</span> : <span><i className="fa fa-user-circle-o" aria-hidden="true"></i> Add A New Student</span> }</button> </div>
                { this.state.showAddUser && <NewStudent />}
                <hr />
                <ul>
                    { mappedStudents ? mappedStudents : 'We currently do not have any students' }
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
    goDeleteStudent: (id) => dispatch(deleteStudent(id))
})

export default connect(mapStateToProps, mapDispatchToProps)(StudentList)
