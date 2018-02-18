import React from 'react';
import ReactDOM from 'react-dom';
import Session from './session';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider'
import registerServiceWorker from './registerServiceWorker';

import store from './store'

import createHistory from 'history/createBrowserHistory'

import { Provider } from 'react-redux'
import { ConnectedRouter } from  'react-router-redux'
import { Route } from 'react-router-dom'

const history = createHistory()


ReactDOM.render(
    <Provider store={store}>
        <MuiThemeProvider>
            <ConnectedRouter history={history}>

                <Route path='/' component={Session}/>

            </ConnectedRouter>
        </MuiThemeProvider>
    </Provider>
    ,
    document.getElementById('root'));
registerServiceWorker();
