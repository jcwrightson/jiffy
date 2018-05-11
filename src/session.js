import React, { Component } from 'react';
import { Route, Switch } from 'react-router-dom'
import ProjectsContainer from './components/projects/projects-container'
import { connect } from 'react-redux'

import './css/flexable.css'
import './sass/styles.css'


import store from './store'
import {getHiddenProp, isToday} from "./functions"


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
        store.dispatch({type: 'FILTER_BLANK'})
        localStorage.setItem('tracker', JSON.stringify(this.props.projects))
    }

    componentDidMount() {
        window.addEventListener("beforeunload", this.onUnload)

        const projects = JSON.parse(localStorage.getItem('tracker'))

        if(projects){
            store.dispatch({type:'BOOTSTRAP', payload:projects})
        }

        const isHidden = ()=>{
            const prop = getHiddenProp();
            if (!prop) return false;
            return document[prop];
        }

        let visProp = getHiddenProp();
        if (visProp) {
            const evtname = visProp.replace(/[H|h]idden/,'') + 'visibilitychange';
            document.addEventListener(evtname, ()=>{
                if (!isHidden()) {

                    console.log('here')
                    this.props.projects.map(project =>{
                        if (project.trackers.filter(tracker => {
                                return isToday(tracker)
                            }).length === 0){
                            store.dispatch({type: 'ADD_TRACKER', payload: {project: project.created}})
                        }
                    })

                }else {
                    localStorage.setItem('tracker', JSON.stringify(this.props.projects))
                }
            });
        }

    }

    componentWillReceiveProps(props){
        if(props !== this.props){
            props.projects.map(project =>{
                if (project.trackers.filter(tracker => {
                    return isToday(tracker)
                }).length === 0){
                    store.dispatch({type: 'ADD_TRACKER', payload: {project: project.created}})
                }
            })
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
