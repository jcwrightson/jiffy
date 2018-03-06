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

        if(this.project.id == created) {
            this.project.style['opacity'] = 0
        }

        setTimeout(()=>{
            this.deleteProject(created)
        }, 400)

        console.log(this.project.id, created)



    }

    deleteProject(created){
        store.dispatch({type:'REMOVE_PROJECT', payload: created})
    }

    addTracker(project){
        store.dispatch({type:'ADD_TRACKER', payload:{project:project}})
    }

    toggleFullWidth(project){
        store.dispatch({type: 'TOGGLE_FULL_WIDTH', payload: project})

        // this.setState({
        //     style: {
        //         opacity: 1,
        //         flexBasis: this.props.project.fullWidth ? '100%' : '49%'
        //     }})

    }

    componentDidMount(){


        const isToday = (tracker)=>{
            const date = new Date(tracker.created)
            const today = new Date(Date.now())

            return today.getDate() + today.getMonth() === date.getDate() + date.getMonth()

        }


        if (this.props.project.trackers.filter(tracker => {
                return isToday(tracker)
            }).length === 0){
            store.dispatch({type: 'ADD_TRACKER', payload: {project: this.props.project.created}})
        }





    }

    render(){

        setTimeout(()=>{
            this.project.style['opacity'] = 1
        }, 200)

        const { project } = this.props

        const totalTime = project.trackers.reduce((total, tracker) =>{
            return total + tracker.time
        }, 0)

        const trackerRunning = ()=>{
           if (project.trackers.filter(tracker=>{
                return tracker.running === true
            }).length > 0){
               return true
            }
        }

        const doStyle = ()=>{
            let style = {
                // opacity: 1,
            }
            if (project.fullWidth) {
                return {
                    ...style,
                    flexBasis: '100%'
                }
            }else {
                return style
            }

        }

        return(
            <div className="project" style={doStyle()} id={project.created} ref={(e)=>{if(e){this.project = e}}}>
                <div className="top" style={{position:'relative'}}>
                    <h1 className="abs middle left">{project.title}</h1>
                    <h2 className="abs middle right"><span className={`${trackerRunning() ? 'running' : ''}`}><i className={`material-icons schedule `}>schedule</i>{timeFilter(totalTime)}</span></h2>
                </div>



                <hr/>

                {project.trackers.map((tracker, i)=>{
                    return <Tracker key={i} index={i} project={project} tracker={tracker}/>
                })}

                <div className="bottom">
                    {/*<button onClick={()=>{this.addTracker(project.created)}}><span><i className="material-icons button">add</i>Tracker</span></button>*/}
                    <span onClick={()=>{this.handleRemove(project.created)}} title="Delete Project"><i className="material-icons delete">delete</i></span>
                    <span className="abs middle right" title={project.fullWidth ? 'Minimise' : 'Maximise'} onClick={()=>{this.toggleFullWidth(project)}}><i className="material-icons crop">{project.fullWidth ? 'crop_3_2' : 'crop_7_5'}</i></span>
                </div>
                    {/*<hr/>*/}
                {/*<div className="circle" onClick={()=>{this.addTracker(project.created)}}><i className="material-icons abs middle">add</i></div>*/}



            </div>
        )
    }
}