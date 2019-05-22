import React from "react"
import ReactDOM from "react-dom"
import { Provider } from "react-redux"
// import {  } from "react-router"
import { Router, Route, Switch } from "react-router-dom"
import Home from "./layouts/Home"
import TasksContainer from "./containers/Tasks.container"

import { history, store } from "./store"

import NavBar from "./layouts/NavBar"
import "./sass/styles.scss"

import { isToday } from "./lib/functions"
import { createTracker, removeTracker } from "./actions"

const initApp = () => {
	// localStorage.removeItem("tracker-2")

	window.addEventListener("beforeunload", () => {
		store.dispatch({ type: "STOP_ALL" })
		const save = {
			projects: store.getState().projects.list,
			tasks: store.getState().tasks.list,
			trackers: store.getState().trackers.list
		}

		localStorage.setItem("tracker-2", JSON.stringify(save))
	})
	const savedData = JSON.parse(localStorage.getItem("tracker-2"))

	if (savedData) {
		store.dispatch({ type: "LOAD_PROJECTS", payload: savedData.projects })
		store.dispatch({ type: "LOAD_TASKS", payload: savedData.tasks })
		store.dispatch({ type: "LOAD_TRACKERS", payload: savedData.trackers })
	}

	// Add today's trackers
	if (savedData && savedData.tasks) {
		savedData.tasks.map(task => {
			const { length } = savedData.trackers
				.filter(tracker => tracker.task === task.uid)
				.filter(tracker => isToday(tracker.created))
			if (length === 0) {
				store.dispatch(createTracker(task.project, task.uid))
			}
		})
	}

	// Remove obsolete trackers
	if (savedData && savedData.trackers) {
		savedData.trackers
			.filter(tracker => !isToday(tracker.created) && tracker.time === 0)
			.map(tracker => store.dispatch(removeTracker(tracker.uid)))
	}
}

initApp()

ReactDOM.render(
	<Provider store={store}>
		<Router history={history}>
			<NavBar />
			<Switch>
				<Route exact path='/' component={Home} />
				<Route path='/projects/:uid' component={TasksContainer} />
			</Switch>
		</Router>
	</Provider>,
	document.getElementById("app")
)
