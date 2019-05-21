import React from "react"
import ReactDOM from "react-dom"
import { Provider } from "react-redux"
import { Route, Router, Switch } from "react-router"
import Home from "./layouts/Home"
import TasksContainer from "./containers/Tasks.container"

import { history, store } from "./store"

import NavBar from "./layouts/NavBar"
import "./lib/flexable.css"
import "./sass/styles.scss"

import { isToday } from "./lib/functions"
import { createTracker, removeTracker } from "./actions"

const initApp = store => {
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

	//Add today's trackers
	if (savedData && savedData.tasks) {
		savedData.tasks.map(task => {
			const length = savedData.trackers
				.filter(tracker => tracker.task === task.uid)
				.filter(tracker => isToday(tracker.created)).length
			if (length === 0) {
				store.dispatch(createTracker(task.uid))
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

initApp(store)

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
