import React, { Component } from 'react';
import { Route, Switch } from 'react-router-dom'
import ProjectsContainer from './components/projects/projects-container'
import { connect } from 'react-redux'
import './sass/styles.css'

import store from './store'


@connect((store)=>{
    return{
        projects: store.projects
    }
})
export default class Session extends Component {
    constructor(props) {
        super(props);

        this.onUnload = this.onUnload.bind(this); // if you need to bind callback to this
    }

    onUnload() {

        store.dispatch({type: 'STOP_ALL'})
        localStorage.setItem('tracker', JSON.stringify(this.props.projects))
    }

    componentDidMount() {
        window.addEventListener("beforeunload", this.onUnload)

        const projects = JSON.parse(localStorage.getItem('tracker'))

        if(projects){
            store.dispatch({type:'BOOTSTRAP', payload:projects})
        }
    }

    componentWillUnmount() {
        window.removeEventListener("beforeunload", this.onUnload)
    }
    render() {
        return (
            <div className="App">
                <Switch>
                    <Route path='/' component={ProjectsContainer}/>
                </Switch>
            </div>
        )
    }
}
