import React, { Component } from 'react'
import { connect } from 'react-redux'

import { Link, withRouter } from 'react-router-dom'

import { putStudent } from 'APP/app/reducers/students'

class EditStudent extends React.Component {
    constructor (props) {
        super(props)
        this.initState = {
            id: 0,
            name: '',
            image: '',
            address: '',
            email: ''
        }
        this.state = this.initState
        this.handleChange = this.handleChange.bind(this)
        this.handleSubmit = this.handleSubmit.bind(this)
    }
    componentDidMount() {
        if(this.props.currentStudent) {
            this.setState({
                id: this.props.currentStudent.id,
                name: this.props.currentStudent.name,
                image: this.props.currentStudent.image,
                address: this.props.currentStudent.address,
                email: this.props.currentStudent.email })
        }
    }

    componentWillReceiveProps(nextProps) {
        if(nextProps.currentStudent) {
            this.setState({
                id: nextProps.currentStudent.id,
                name: nextProps.currentStudent.name,
                image: nextProps.currentStudent.image,
                address: nextProps.currentStudent.address,
                email: nextProps.currentStudent.email })
        }
    }

    handleChange(event) {
        const target = event.target.name
        const value = event.target.value
        let updateObj = {}
        updateObj[target] = value
        this.setState(updateObj)
        console.log(this.props)
    }

    handleSubmit(event) {
        event.preventDefault()
        const updatedStudent = this.state
        console.log("TRY TO SUBMIT THIS STATE::::::::::::::::::::::::::::::",updatedStudent)
        this.props.goPutStudent(updatedStudent)
        this.props.update()
    }

    render(){
        if(this.props.currentStudent) {
            return (
                <form onSubmit={this.handleSubmit}>
                <fieldset>
                    <label>Student Name</label>
                    <input value={this.state.name} onChange={this.handleChange} type="text" name="name"/>
                </fieldset>
                <fieldset>
                    <label>Student Address</label>
                    <input value={this.state.address} onChange={this.handleChange} type="text" name="address"/>
                </fieldset>
                <fieldset>
                    <label>Student Image</label>
                    <input value={this.state.image} onChange={this.handleChange} type="text" name="image"/>
                </fieldset>
                <fieldset>
                    <label>Student Manager Email</label>
                    <input value={this.state.email} onChange={this.handleChange} type="text" name="email"/>
                </fieldset>
                <button type="submit">Save Student Edit</button>
            </form>
            )
        } else  {
            return null
        }
    }

}
// export default EditStudent

const mapStateToProps = (state, ownProps) => {
    // let currStudID
    let currStudID
    if(ownProps.match.params.studentId) {
        currStudID = parseInt(ownProps.match.params.studentId)
    }
    
    const currStudObj = state.students.studentsList.find(student => student.id === currStudID)

    return {
        campuses: state.campuses.campusesList,
        currentStudent: currStudObj,
        students: state.students.studentsList
    }
}


const mapDispatchToProps = (dispatch, ownProps) => ({
    goPutStudent: (updatedCampus) => dispatch(putStudent(updatedCampus))
})

export default withRouter(connect(mapStateToProps,mapDispatchToProps)(EditStudent))