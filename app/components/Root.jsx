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
import SingleStudent from './SingleStudent.jsx'
import EditCampus from './EditCampus.jsx'

class Root extends Component {
  componentDidMount() {
    this.props.goFetchCampuses()
    this.props.goFetchStudents()
  }

  render() { 
    if(this.props.campuses && this.props.students) {
      
    }
    return (
      <div className="Main">
        <Header campuses={this.props.campuses} students={this.props.students}/>
        <Switch>  
          <Route exact path="/" component={Welcome} />
          <Route exact path="/campus" component={CampusList} />
          <Route path="/campus/:campusId" component={SingleCampus} />
          <Route exact path="/student" component={StudentList} />
          <Route path="/student/:studentId" component={({ match }) => (<SingleStudent studentId={match.params.studentId} students={this.props.students} />)} />
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