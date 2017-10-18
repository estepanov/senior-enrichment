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

// ACTION CREATORS
// load multiple students
export function loadStudents (students) {
  const action = { type: LOAD_STUDENTS, students }
  return action
}
// load a single student (planning for socket)
export function loadStudent (student) {
    const action = { type: LOAD_STUDENT, student }
    return action
  }

// THUNK CREATORS
export const fetchStudents = () => {
    return (dispatch) => {
        return axios.get('/api/students/')
            .then(res => res.data)
            .then(students => {
                const action = loadStudents(students);
                dispatch(action)
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
        case LOAD_STUDENT:
            return {
                ...state,
                studentsList: [...state.students, action.student]
            }

        default:
        return state
    }
}