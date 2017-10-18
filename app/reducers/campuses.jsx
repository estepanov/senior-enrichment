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

// ACTION CREATORS
export function loadCampuses (campuses) {
  const action = { type: LOAD_CAMPUSES, campuses }
  return action
}
export function loadCampus (campus) {
    const action = { type: LOAD_CAMPUS, campus }
    return action
  }

// THUNK CREATORS
export const fetchCampuses = () => {
    return (dispatch) => {
        return axios.get('/api/campus/')
            .then(res => res.data)
            .then(campuses => {
                const action = loadCampuses(campuses);
                dispatch(action)
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
                campusesList: [...state.campuses, action.campus]
            }

        default:
        return state
    }
}