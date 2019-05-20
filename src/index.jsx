import React from "react"
import ReactDOM from "react-dom"
import { Provider } from "react-redux"
import { Route, Router } from "react-router"
import Session from "./session"

import { history, store } from "./store"

ReactDOM.render(
	<Provider store={store}>
		<Router history={history}>
			<Route path='/' component={Session} />
		</Router>
	</Provider>,
	document.getElementById("app")
)