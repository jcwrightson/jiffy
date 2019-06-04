import React from "react"
import ReactDOM from "react-dom"
import { Provider } from "react-redux"
// import {  } from "react-router"
import { Router, Redirect, Route, Switch } from "react-router-dom"
import Tasks from "./layouts/Tasks"
import Projects from "./layouts/Projects"

import { history, store } from "./store"

import Modals from "./modals/Modals.container"
import "./sass/styles.scss"

import houseKeeping from "./lib/houseKeeping"
import Timesheets from "./layouts/Timesheets"

houseKeeping()

ReactDOM.render(
	<Provider store={store}>
		<Router history={history}>
			<Switch>
				<Route exact path='/' component={() => <Redirect to='/tasks' />} />
				<Route path='/tasks' component={Tasks} />
				<Route exact path='/projects' component={Projects} />
				<Route path='/timesheets' component={Timesheets} />
			</Switch>
			<Modals />
		</Router>
	</Provider>,
	document.getElementById("app")
)
