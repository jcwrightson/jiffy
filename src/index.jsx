import React from "react"
import ReactDOM from "react-dom"
import { Provider } from "react-redux"
// import {  } from "react-router"
import { Router, Redirect, Route, Switch } from "react-router-dom"
import TasksContainer from "./containers/Tasks.container"
import Projects from "./layouts/Projects"

import { history, store } from "./store"

import NavBar from "./layouts/NavBar"
import Modals from "./modals/Modals.container"
import "./sass/styles.scss"

import houseKeeping from "./lib/houseKeeping"
import TimesheetContainer from "./containers/Timesheet.container"

houseKeeping()

ReactDOM.render(
	<Provider store={store}>
		<Router history={history}>
			<NavBar />
			<Switch>
				<Route exact path='/' component={() => <Redirect to='/tasks' />} />
				<Route path='/tasks' component={TasksContainer} />
				<Route exact path='/projects' component={Projects} />
				<Route path='/timesheets' component={TimesheetContainer} />
			</Switch>
			<Modals />
		</Router>
	</Provider>,
	document.getElementById("app")
)
