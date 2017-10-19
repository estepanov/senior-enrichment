import React, { Component } from 'react'
import { connect } from 'react-redux'
import store from 'APP/app/store.jsx'
import { withRouter } from 'react-router-dom'
import { postCampus } from 'APP/app/reducers/campuses.jsx'

class NewCampus extends React.Component {
    constructor(props) {
        console.log("INSIDE NEW CAMPUS")
        super(props)
        this.initState = {
            name: '',
            image: '',
            address: '',
            managerEmail: ''
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
        const newCampus = this.state
        this.setState(this.initState)
        this.props.goPostCampus(newCampus)
    }

    render () {
        return (
            <form onChange={this.handleChange} onSubmit={this.handleSubmit}>
                <fieldset>
                    <label>Campus Name</label>
                    <input value={this.state.name} type="text" name="name"/>
                </fieldset>
                <fieldset>
                    <label>Campus Address</label>
                    <input value={this.state.address} type="text" name="address"/>
                </fieldset>
                <fieldset>
                    <label>Campus Image</label>
                    <input value={this.state.image} type="text" name="image"/>
                </fieldset>
                <fieldset>
                    <label>Campus Manager Email</label>
                    <input value={this.state.managerEmail} type="text" name="managerEmail"/>
                </fieldset>
                <button type="submit">Create New Campus</button>
            </form>
        )
    }
}

const mapStateToProps = (state, ownProps) => ({
    campuses: state.campuses.campusesList
})
  
const mapDispatchToProps = (dispatch, ownProps) => ({
    goPostCampus: (newCampus) => {dispatch(postCampus(newCampus))}
})

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(NewCampus))