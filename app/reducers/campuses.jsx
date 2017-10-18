'use strict'
import axios from 'axios'
// import socket from '../socket'

// INITIAL STATE
const initialState = {
    campusesList: [],
    currentCampus: {}
}

// ACTION TYPES
// load multiple campuses
const LOAD_CAMPUSES = 'LOAD_CAMPUSES'
// load a single campus (planning for socket)
const LOAD_CAMPUS = 'LOAD_CAMPUS'
// obj to SUBMIT new campus
const NEW_CAMPUS = 'NEW_CAMPUS'

// ACTION CREATORS
export function loadCampuses (campuses) {
  const action = { type: LOAD_CAMPUSES, campuses }
  return action
}
export function loadCampus (campus) {
    const action = { type: LOAD_CAMPUS, campus }
    return action
}
export function NewCampus (newCampus) {
    const action = { type: NEW_CAMPUS, newCampus }
    return action
}

// THUNK CREATORS
export const fetchCampuses = () => {
    return (dispatch) => {
        return axios.get('/api/campus/students')
            .then(res => res.data)
            .then(campuses => {
                const action = loadCampuses(campuses)
                dispatch(action)
            })
            .catch(error => {
                console.error(error)
            })
    }
}
export const postCampus = (newCampus) => {
    return (dispatch) => {
        return axios.post('/api/campus/', newCampus)
            .then(res => res.data)
            .then(newCampusRetObj => {
                // returns new campus obj which includes the assigned ID
                const action = loadCampus(newCampusRetObj)
                dispatch(action)
            })
            .catch(error => {
                console.error(error)
            })
    }
}

// REDUCER
export default function reducer (state = initialState, action) {
    switch (action.type) {
        case LOAD_CAMPUSES:
            return {
                ...state,
                campusesList: action.campuses
            }
        case LOAD_CAMPUS:
            return {
                ...state,
                campusesList: [...state.campusesList, action.campus]
            }
        default:
        return state
    }
}