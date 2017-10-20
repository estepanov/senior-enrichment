import React, { Component } from 'react'
import { connect } from 'react-redux'

import { Link, withRouter } from 'react-router-dom'

import { putCampus } from 'APP/app/reducers/campuses'

class EditCampus extends React.Component {
    constructor (props) {
        super(props)
        this.initState = {
            id: 0,
            name: '',
            image: '',
            address: '',
            managerEmail: ''
        }
        this.state = this.initState
        this.handleChange = this.handleChange.bind(this)
        this.handleSubmit = this.handleSubmit.bind(this)
    }
    componentDidMount() {
        if(this.props.currentCampus) {
            this.setState({
                id: this.props.currentCampus.id,
                name: this.props.currentCampus.name,
                image: this.props.currentCampus.image,
                address: this.props.currentCampus.address,
                managerEmail: this.props.currentCampus.managerEmail })
        }
    }

    componentWillReceiveProps(nextProps) {
        if(nextProps.currentCampus) {
            this.setState({
                id: nextProps.currentCampus.id,
                name: nextProps.currentCampus.name,
                image: nextProps.currentCampus.image,
                address: nextProps.currentCampus.address,
                managerEmail: nextProps.currentCampus.managerEmail })
        }
    }

    handleChange(event) {
        const target = event.target.name
        const value = event.target.value
        let updateObj = {}
        updateObj[target] = value
        this.setState(updateObj)
    }

    handleSubmit(event) {
        event.preventDefault()
        const updatedCampus = this.state
        this.props.goPutCampus(updatedCampus)
        this.props.update()
    }

    render(){
        if(this.props.currentCampus) {
            return (
                <form onSubmit={this.handleSubmit}>
                <fieldset>
                    <label>Campus Name</label>
                    <input value={this.state.name} onChange={this.handleChange} type="text" name="name"/>
                </fieldset>
                <fieldset>
                    <label>Campus Address</label>
                    <input value={this.state.address} onChange={this.handleChange} type="text" name="address"/>
                </fieldset>
                <fieldset>
                    <label>Campus Image</label>
                    <input value={this.state.image} onChange={this.handleChange} type="text" name="image"/>
                </fieldset>
                <fieldset>
                    <label>Campus Manager Email</label>
                    <input value={this.state.managerEmail} onChange={this.handleChange} type="text" name="managerEmail"/>
                </fieldset>
                <button type="submit">Save Campus Edit</button>
            </form>
            )
        } else  {
            return null
        }
    }

}

const mapStateToProps = (state, ownProps) => {
    const currCampId = parseInt(ownProps.match.params.campusId)
    const currCampObj = state.campuses.campusesList.find(campus => campus.id === currCampId)

    return {
        campuses: state.campuses.campusesList,
        currentCampus: currCampObj,
        students: state.students.studentsList
    }
}


const mapDispatchToProps = (dispatch, ownProps) => ({
    goPutCampus: (updatedCampus) => { dispatch(putCampus(updatedCampus)) }
})

export default withRouter(connect(mapStateToProps,mapDispatchToProps)(EditCampus))