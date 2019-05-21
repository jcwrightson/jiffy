import { applyMiddleware, createStore, combineReducers } from "redux"
import { createBrowserHistory } from "history"

import { logger } from "redux-logger"
import thunk from "redux-thunk"

import { routerMiddleware, connectRouter } from "connected-react-router"

import * as reducers from "./reducers/"

export const history = createBrowserHistory({
	basename: process.env.PUBLIC_URL
});

const App = combineReducers({ ...reducers, routing: connectRouter(history) })

const middleware = applyMiddleware(thunk, logger, routerMiddleware(history))

export const store = createStore(App, middleware)
