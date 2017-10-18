'use strict'
import axios from 'axios'
// import socket from '../socket'

// INITIAL STATE
const initialState = {
    studentsList: [],
    currentStudent: {}
}

// ACTION TYPES
// load multiple students
const LOAD_STUDENTS = 'LOAD_STUDENTS'
// load a single student (planning for socket)
const LOAD_STUDENT = 'LOAD_STUDENT'
// obj to SUBMIT new student
const NEW_STUDENT = 'NEW_STUDENT'

// ACTION CREATORS
// load multiple students
export function loadStudents (students) {
  const action = { type: LOAD_STUDENTS, students }
  return action
}
// load a single student (planning for socket)
export function loadStudent (newStudent) {
    const action = { type: LOAD_STUDENT, newStudent }
    return action
  }

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
            .then(newStudentRetObj => {
                const action = loadStudent(newStudentRetObj)
                dispatch(action)
            })
            .catch(console.error)
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
        case LOAD_STUDENT:
            return {
                ...state,
                studentsList: [...state.studentsList, action.newStudent]
            }

        default:
            return state
    }
}