import React, { Component } from 'react'
import { connect } from 'react-redux'

const StudentList = props =>  { 
    let mappedStudents
    if (props.students.length >= 1) {
        mappedStudents = props.students.map((student) => {
        return <li key={student.id}>{student.name}</li>
    })
    }
    return (
    <div>
        <ul>
        { mappedStudents ? mappedStudents : '' }
        </ul>
    </div>
    )
}
  
export default StudentList