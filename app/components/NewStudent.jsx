import React, { Component } from 'react'
import { connect } from 'react-redux'
import store from 'APP/app/store.jsx'
import { postStudent } from 'APP/app/reducers/students.jsx'

class newStudent extends React.Component {
    constructor(props) {
        super(props)
        this.initState = {
            name: '',
            image: '',
            address: '',
            email: '',
            campusId: 1
        }
        this.state = this.initState
        this.handleChange = this.handleChange.bind(this)
        this.handleSubmit = this.handleSubmit.bind(this)
    }

    handleChange(event) {
        // get the element name that has changed
        const target = event.target.name
        // get the changed elements value
        const value = event.target.value
        // initiate new update object that will be used to update store
        let updateObj = {}
        // set key and value of new obj to be the name and value of the changed element
        updateObj[target] = value
        this.setState(updateObj)
    }

    handleSubmit(event) {
        event.preventDefault()
        const newStudent = this.state
        this.setState(this.initState)
        console.log('attempting to submit new student', newStudent)
        this.props.goPostStudent(newStudent)
    }

    render () {
        let campusOptions
        if(this.props.campusesList) {
            campusOptions = this.props.campusesList.map(campus => 
                (<option key={campus.id} value={campus.id}>{campus.name}</option>)
            )
        }
        return (
            <form onChange={this.handleChange} onSubmit={this.handleSubmit}>
                <fieldset>
                    <label>Student Name</label>
                    <input value={this.state.name} type="text" name="name"/>
                </fieldset>
                <fieldset>
                    <label>Student Address</label>
                    <input value={this.state.address} type="text" name="address"/>
                </fieldset>
                <fieldset>
                    <label>Student Image</label>
                    <input value={this.state.image} type="text" name="image"/>
                </fieldset>
                <fieldset>
                    <label>Student Email</label>
                    <input value={this.state.email} type="text" name="email"/>
                </fieldset>
                <fieldset>
                    <label>Student Campus</label>
                    <select>
                        {campusOptions}
                    </select>
                </fieldset>
                <button type="submit">Create New Student</button>
            </form>
        )
    }
}

const mapStateToProps = (state, ownProps) => ({
    campusesList: state.campuses.campusesList,
    students: state.students.studentsList
})
  
const mapDispatchToProps = (dispatch, ownProps) => ({
    goPostStudent: (newStudent) => {dispatch(postStudent(newStudent))}
})

export default connect(mapStateToProps, mapDispatchToProps)(newStudent)