import React from "react"
import ReactDOM from "react-dom"
import { Provider } from "react-redux"
// import {  } from "react-router"
import { Router, Redirect, Route, Switch } from "react-router-dom"
import Home from "./layouts/Home"
import AllTasksContainer from "./containers/AllTasks.container"
import TasksContainer from "./containers/Tasks.container"
import Projects from "./layouts/Projects"

import { history, store } from "./store"

import NavBar from "./layouts/NavBar"
import "./sass/styles.scss"

import houseKeeping from "./lib/houseKeeping"

houseKeeping()

ReactDOM.render(
	<Provider store={store}>
		<Router history={history}>
			<NavBar />
			<Switch>
				<Route exact path='/' component={() => <Redirect to='/tasks' />} />
				<Route path='/tasks' component={AllTasksContainer} />
				<Route exact path='/projects' component={Projects} />
				<Route path='/projects/:uid' component={TasksContainer} />
			</Switch>
		</Router>
	</Provider>,
	document.getElementById("app")
)
