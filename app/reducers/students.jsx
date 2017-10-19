'use strict'
import axios from 'axios'
// import socket from '../socket'

// INITIAL STATE
const initialState = {
    studentsList: []
}

// ACTION TYPES
// load multiple students
const LOAD_STUDENTS = 'LOAD_STUDENTS'
// load a single student (planning for socket)
// const LOAD_STUDENT = 'LOAD_STUDENT'


// ACTION CREATORS
// load multiple students
export function loadStudents (students) {
  const action = { type: LOAD_STUDENTS, students }
  return action
}
// load a single student (planning for socket)
// export function loadStudent (newStudent) {
//     const action = { type: LOAD_STUDENT, newStudent }
//     return action
// }

// THUNK CREATORS
export const fetchStudents = () => {
    return (dispatch) => {
        return axios.get('/api/students/')
            .then(res => res.data)
            .then(students => {
                const action = loadStudents(students)
                dispatch(action)
            })
            .catch(console.error)
    }
}
export const postStudent = (newStudent) => {
    return (dispatch) => {
        return axios.post('/api/students/', newStudent)
            .then(res => res.data)
            .then(() => {
                // ignore returned student lets refresh our students
                dispatch(fetchStudents())
            })
            .catch(console.error)
    }
}
export const putStudent = (updatedStudent) => {
    return (dispatch) => {
        return axios.put(`/api/students/${updatedStudent.id}`, updatedStudent)
            .then(res => res.data)
            .then(() => {
                // ignore returned student lets refresh our students
                dispatch(fetchStudents())
            })
            .catch(error => {
                console.error(error)
            })
    }
}
export const deleteStudent = (id) => {
    return (dispatch) => {
        return axios.delete(`/api/students/${id}`)
            .then(res => res.data)
            .then(() => {
                // ignore returned info lets refresh our students
                dispatch(fetchStudents())
            })
            .catch(error => {
                console.error(error)
            })
    }
}

// REDUCER
export default function reducer (state = initialState, action) {
    switch (action.type) {
        case LOAD_STUDENTS:
            return {
                ...state,
                studentsList: action.students
            }
        // case LOAD_STUDENT:
        //     return {
        //         ...state,
        //         studentsList: [...state.studentsList, action.newStudent]
        //     }

        default:
            return state
    }
}