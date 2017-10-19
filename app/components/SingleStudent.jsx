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
        // this.forceUpdate()
    }

    updated() {
        this.handleEditClick()
        // this.forceUpdate()
    }

    handleEditClick(e) {
        if(e) e.preventDefault()
        console.log("hit edit click")
        this.setState({showEditDetails: !this.state.showEditDetails})
    }

    render () {
        console.log("->>>------>>>>>",this.props)
        const currStudent = this.props.currentStudent
        if(currStudent) {
            return (
                <div>
                    <h2>{currStudent.name} <button onClick={this.handleEditClick}>{ this.state.showEditDetails ? 'Hide Edit' : 'Edit Student' }</button></h2>
                    { this.state.showEditDetails && <EditStudent update={this.updated} />}
                    <ul>
                       {currStudent.address}
                    </ul>
                    <button onClick={this.handleAddStudentClick}>{ this.state.showAddStudent ? 'Hide Add Student' : 'Add Student'}</button>
                    { this.state.showAddStudent && <NewStudent update={this.studentAdded} specificId={this.props.currentStudent.id} /> }
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


const mapDispatchToProps = dispatch => ({
    goFetchStudents: () => dispatch(fetchStudents())
})

export default withRouter(connect(mapStateToProps,mapDispatchToProps )(SingleStudent))

// const SingleStudent = props =>  {
//     const STUDENT_ID = parseInt(props.studentId)
//     console.log("single student props", props)
//     // console.log("student", STUDENT_ID)
//     let currentStudent
//     if(props.students) {
//         props.students.forEach(student => {
//             if(student.id === STUDENT_ID) currentStudent = student
//         })
//     }
//     return (
//     <div>
//         <p>this is a single student view</p>
//         { currentStudent ? currentStudent.name : 'not a valid student' }
//         <ul>
//             <li> { currentStudent && currentStudent.name} </li>
//             <li> { currentStudent && currentStudent.address} </li>
//             <li> { currentStudent && currentStudent.image } </li>
//             <li> { currentStudent && currentStudent.campusId } </li>
//         </ul>
//     </div>
//     )
// }
  
// export default SingleStudent