import React from "react"
import ReactDOM from "react-dom"
import { Provider } from "react-redux"
import { Route, Router, Switch } from "react-router"
import Home from "./layouts/Home"
import ProjectContainer from "./containers/Project.container"

import { history, store } from "./store"

const initApp = (store) => {
	// localStorage.removeItem("tracker-2")

	window.addEventListener("beforeunload", () => {
		store.dispatch({type: "STOP_ALL"})
		const save = {
			projects: store.getState().newProjects.list,
			tasks: store.getState().newTasks.list,
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
}

initApp(store)

ReactDOM.render(
	<Provider store={store}>
		<Router history={history}>
			<Switch>
				<Route exact path='/' component={Home} />
				<Route exact path='/projects/:uid' component={ProjectContainer} />
			</Switch>
		</Router>
	</Provider>,
	document.getElementById("app")
)
