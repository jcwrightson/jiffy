import { applyMiddleware, createStore } from 'redux'
import { combineReducers } from 'redux'
import createHistory from 'history/createBrowserHistory'

import { logger } from 'redux-logger'
import thunk from 'redux-thunk'


import { routerReducer, routerMiddleware } from 'react-router-redux'

import * as reducers from './reducers'


const history = createHistory()

const App = combineReducers({...reducers, routing : routerReducer})

const middleware = applyMiddleware(thunk,logger, routerMiddleware(history))


export default createStore(App, middleware)