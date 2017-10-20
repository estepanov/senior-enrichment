import React, { Component } from 'react'
import { connect } from 'react-redux'
import store from 'APP/app/store.jsx'
import { postStudent } from 'APP/app/reducers/students.jsx'

class newStudent extends React.Component {
    constructor(props) {
        super(props)
        const defaultId = this.props.specificId ? this.props.specificId : 1
        this.initState = {
            name: '',
            image: '',
            address: '',
            email: '',
            CampusId: defaultId
        }
        this.state = this.initState
        this.handleChange = this.handleChange.bind(this)
        this.handleSubmit = this.handleSubmit.bind(this)
    }

    handleChange(event) {
        const target = event.target.name
        let value = event.target.value
        // if the target was campusId then we need to parse it as an int
        if(target === "CampusId") value = parseInt(value)
        let updateObj = {}
        updateObj[target] = value
        this.setState(updateObj)
    }

    handleSubmit(event) {
        event.preventDefault()
        const newStudent = this.state
        this.setState(this.initState)
        this.props.goPostStudent(newStudent)
        if(this.props.update) this.props.update()
    }

    render () {
        let campusOptions
        if(this.props.campusesList) {
            campusOptions = this.props.campusesList.map(campus => (
                <option key={campus.id} value={campus.id}>{campus.name}</option>
            ))
        }
        return (
            <form onChange={this.handleChange} onSubmit={this.handleSubmit}>
                <div className="sameLine">
                    <fieldset>
                        <label>Student Name</label>
                        <input value={this.state.name} type="text" name="name"/>
                    </fieldset>
                    <fieldset>
                        <label>Student Address</label>
                        <input value={this.state.address} type="text" name="address"/>
                    </fieldset>
                </div>
                <div className="sameLine">
                    <fieldset>
                        <label>Student Image</label>
                        <input value={this.state.image} type="text" name="image"/>
                    </fieldset>
                    <fieldset>
                        <label>Student Email</label>
                        <input value={this.state.email} type="text" name="email"/>
                    </fieldset>
                </div>
                <fieldset>
                    <label>Student Campus</label>
                    <select name="CampusId" defaultValue={this.state.CampusId} disabled={this.props.specificId? true : false}  >
                        {campusOptions}
                    </select>
                </fieldset>
                <button className="submitButton" type="submit">Create New Student</button>
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