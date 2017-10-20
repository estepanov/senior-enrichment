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
        this.findCampus = this.findCampus.bind(this)
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

    findCampus(allCampuses,campusId) {
        let currCampus 
        if(allCampuses.length) {
            currCampus = allCampuses.find(campus => {
                console.log("campusid",campus.id)
                return campus.id === campusId
            })
        }
        return currCampus
    }

    render () {
        const currStudent = this.props.currentStudent
        
        if(currStudent) {
            console.log(">>>>",currStudent.CampusId)
            const currCampus = this.findCampus(this.props.campuses, currStudent.CampusId)
            console.log("CURRREEEENtt:::::",currCampus)
            return (
                <div>
                    <h2>Student Profile</h2>
                    <hr />
                    <div className="sameLine"><h3>{currStudent.name}</h3><button className="toggleBox" onClick={this.handleEditClick}>{ this.state.showEditDetails ? 'Hide Edit' : 'Edit Student' }</button></div>
                        { this.state.showEditDetails && <EditStudent update={this.updated} />}
                        
                        {currStudent.address}<br />
                        {currStudent.email}<br />
                        Enrolled in: {currCampus.name}

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