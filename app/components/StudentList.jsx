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

    toggleAddStudent(event) {
        event.preventDefault()
        console.log("------------>",this.state)
        this.setState({showAddUser: !this.state.showAddUser})
    }

    render () { 
        let mappedStudents
        if (this.props.students.length) {
            mappedStudents = this.props.students.map((student) => {
                return <li key={student.id}><Link to={`/student/${student.id}`}>{student.name}</Link> - <button onClick={() => this.props.goDeleteStudent(student.id)}>DELETE</button></li>
            })
        }
        return (
            <div>
                <button onClick={this.toggleAddStudent}>{ this.state.showAddUser ? 'Hide Form' : 'Add A New Student' }</button>
                { this.state.showAddUser && <NewStudent />}
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
    //     let mappedStudents
    //     if (props.students.length) {
    //         mappedStudents = props.students.map((student) => {
    //             return <li key={student.id}><Link to={`/student/${student.id}`}>{student.name}</Link></li>
    //         })
    //     }
    //     return (
    //     <div>
    //         <NewStudent />
    //         <ul>
    //             { mappedStudents ? mappedStudents : 'We currently do not have any students' }
    //         </ul>
    //     </div>
    //     )
    // }



// const StudentList = props =>  { 
//     let mappedStudents
//     if (props.students.length) {
//         mappedStudents = props.students.map((student) => {
//             return <li key={student.id}><Link to={`/student/${student.id}`}>{student.name}</Link></li>
//         })
//     }
//     return (
//     <div>
//         <NewStudent />
//         <ul>
//             { mappedStudents ? mappedStudents : 'We currently do not have any students' }
//         </ul>
//     </div>
//     )
// }
  
// export default StudentList