import React, { Component } from 'react'
import { Route, Switch, Redirect, withRouter } from 'react-router-dom'
import { connect } from 'react-redux'

import store from 'APP/app/store.jsx'
import { fetchCampuses } from 'APP/app/reducers/campuses.jsx'
import { fetchStudents } from 'APP/app/reducers/students.jsx'

import Header from './Header.jsx'
import Footer from './Footer.jsx'
import Welcome from './Welcome.jsx'
import CampusList from './CampusList.jsx'
import StudentList from './StudentList.jsx'
import SingleCampus from './SingleCampus.jsx'

class Root extends Component {
  componentDidMount() {
    this.props.goFetchCampuses()
    this.props.goFetchStudents()
  }

  render() { 
    if(this.props.campuses && this.props.students) {
      
    }
    return (
      <div>
        <Header campuses={this.props.campuses} students={this.props.students}/>
        <Switch>  
          <Route exact path="/" component={Welcome} />
          <Route exact path="/campuses" component={() => (<CampusList campuses={this.props.campuses} students={this.props.students}/>)} />
          <Route path="/campus/:campusId" component={SingleCampus} />
          <Route exact path="/students" component={() => (<StudentList students={this.props.students} campuses={this.props.campuses}/>)} />
        </Switch>
        <Footer />
      </div>
    )
  }
}

const mapStateToProps = state => ({
  campuses: state.campuses.campusesList,
  students: state.students.studentsList
})

const mapDispatchToProps = dispatch => ({
  goFetchCampuses: () => dispatch(fetchCampuses()),
  goFetchStudents: () => dispatch(fetchStudents())
})

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(Root))