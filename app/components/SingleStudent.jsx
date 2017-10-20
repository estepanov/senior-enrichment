import React, { Component } from 'react'
import { connect } from 'react-redux'
import { Link, withRouter } from 'react-router-dom'

import { fetchCampuses } from 'APP/app/reducers/campuses.jsx'
import { fetchStudents } from 'APP/app/reducers/students.jsx'

import EditStudent from './EditStudent.jsx'

class SingleStudent extends React.Component {
    constructor (props) {
        super(props)
        this.state = {
            showEditDetails: false
        }
        this.handleEditClick = this.handleEditClick.bind(this)
        this.updated = this.updated.bind(this)
    }

    updated() {
        this.handleEditClick()
    }

    updated() {
        this.handleEditClick()
    }

    handleEditClick(e) {
        if(e) e.preventDefault()
        this.setState({showEditDetails: !this.state.showEditDetails})
    }

    render () {
        const currStudent = this.props.currentStudent
        if(currStudent) {
            return (
                <div>
                    <h2>{currStudent.name} <button onClick={this.handleEditClick}>{ this.state.showEditDetails ? 'Hide Edit' : 'Edit Student' }</button></h2>
                    { this.state.showEditDetails && <EditStudent update={this.updated} />}
                    <ul>
                       {currStudent.address}
                    </ul>
                </div>
                )
        } else {
            return <div>not a valid student</div>
        }
    }
}
const mapStateToProps = (state, ownProps) => {
    const currStudentId = parseInt(ownProps.match.params.studentId)
    const currStudent = state.students.studentsList.find(student => student.id === currStudentId)

    return {
        campuses: state.campuses.campusesList,
        currentStudent: currStudent,
        students: state.students.studentsList
    }
}

export default withRouter(connect(mapStateToProps)(SingleStudent))