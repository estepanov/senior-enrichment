import React, { Component } from 'react'
import { connect } from 'react-redux'
import NewStudent from './NewStudent.jsx'

const StudentList = props =>  { 
    let mappedStudents
    if (props.students.length) {
        mappedStudents = props.students.map((student) => {
            return <li key={student.id}>{student.name}</li>
        })
    }
    return (
    <div>
        <NewStudent />
        <ul>
        { mappedStudents ? mappedStudents : 'We currently do not have any students' }
        </ul>
    </div>
    )
}
  
export default StudentList