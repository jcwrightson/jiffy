import React, { Component } from 'react'
import Tracker from './tracker'

import {timeFilter} from '../../functions'

import store from '../../store'

import './project.css'

export default class Project extends Component {

    constructor(props){
        super(props)

        this.state = {
            time: 0,
            style : {
                opacity : 0
            }
        }

        this.start = this.start.bind(this)
        this.stop = this.stop.bind(this)
        // this.addTracker = this.addTracker.bind(this)

    }

    start(project, tracker){

        if(!this.props.project.running){

            store.dispatch({type: 'TOGGLE_RUNNING', payload: {project: project, tracker: tracker}})

            this.ticker = setInterval(()=>{

                store.dispatch({type:'UPDATE_TRACKER', payload: {project: project, tracker: tracker, time: 1000}})


            }, 1000)
        }

    }

    stop(project, tracker){
        clearInterval(this.ticker)

        store.dispatch({type: 'TOGGLE_RUNNING', payload: {project: project, tracker: tracker}})

    }

    transEnd(){
        console.log('ended')
    }

    handleRemove(created){

        if(this.ticker) {
            this.stop(created)
        }
        //
        // setTimeout(()=>{
        //     this.setState({style: {opacity: 0, visibility: 'hidden'}})
        // }, 100)

        // this.setState({style: {opacity: 0, visibility: 'hidden'}})

        // this.project.style['opacity'] = 0
        // console.log(this.project)

        // setTimeout(()=>{
        //     store.dispatch({type:'REMOVE_PROJECT', payload: created})
        // }, 500)

        store.dispatch({type:'REMOVE_PROJECT', payload: created})
        // let mountNode = ReactDOM.findDOMNode(this.project);
        // let unmount = ReactDOM.unmountComponentAtNode(mountNode);

        // this.props.remove(created)

        // this.setState({time: 0})


    }

    componentWillUnmount(){
        console.log('Unmounting...')
    }


    addTracker(project){
        store.dispatch({type:'ADD_TRACKER', payload:{project:project}})
    }

    componentDidMount(){
        setTimeout(()=>{
            this.setState({style: {opacity: 1}})
        }, 10)
    }



    render(){

        const { project } = this.props

        const totalTime = project.trackers.reduce((total, tracker) =>{
            return total + tracker.time
        }, 0)

        return(
            <div className="project" style={this.state.style} id={project.created} ref={(e)=>{if(e){this.project = e}}}>
                <ul className="meta">
                    <li><h1>{project.title}</h1></li>
                    <li><h2>{timeFilter(totalTime)}</h2></li>
                    <li><button tooltip="Remove" onClick={()=>{this.handleRemove(project.created)}}>Delete</button></li>
                </ul>


                {project.trackers.map((tracker, i)=>{
                    return <Tracker key={i} index={i} project={project} tracker={tracker}/>
                })}


                <button onClick={()=>{this.addTracker(project.created)}}>Add Tracker</button>



            </div>
        )
    }
}