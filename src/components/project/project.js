import React, { Component } from 'react'
import Tracker from './tracker'

import {timeFilter, getHiddenProp, isToday} from '../../functions'

import store from '../../store'

import './project.css'

export default class Project extends Component {

    constructor(props){
        super(props)

        this.state = {
            time: 0,
            style : {
                opacity : 0
            },
            minimised : true
        }

        this.start = this.start.bind(this)
        this.stop = this.stop.bind(this)
        this.midnight = false

    }

    start(project, tracker){



        if(!tracker.running){

            store.dispatch({type: 'TOGGLE_RUNNING', payload: {project: project, tracker: tracker}})


            this.ticker = setInterval(()=>{

                const time = new Date(Date.now())


                if((time.getHours() + time.getMinutes()) === 0 && !this.midnight){

                    clearInterval(this.ticker)
                    this.midnight = true

                    setTimeout(()=>{
                        this.midnight = false
                    }, 60000)



                    store.dispatch({type: 'TOGGLE_RUNNING', payload: {project: project, tracker: tracker}})

                    tracker = Date.now()
                    store.dispatch({type:'ADD_TRACKER', payload: {project:project, created: tracker}})
                    this.start(project, tracker)

                }else {

                    store.dispatch({type: 'UPDATE_TRACKER', payload: {project: project, tracker: tracker, time: 1000}})
                }


            }, 1000)
        }

    }

    stop(project, tracker){
        clearInterval(this.ticker)
        this.ticker = null

        store.dispatch({type: 'TOGGLE_RUNNING', payload: {project: project, tracker: tracker}})

    }

    reset(project, tracker){
        if(tracker.running) {
            this.stop(project, tracker)
        }

        store.dispatch({type:'RESET_TRACKER', payload: {project: project, tracker: tracker}})
    }

    toggleMinimised(){
        this.setState({
            minimised: !this.state.minimised
        })
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

    handleExport(project){

        this.props.toggleModal('exportModal', {export: true, project: project})
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

    filterBlank(){
        store.dispatch({type: 'FILTER_BLANK'})
    }

    togglePopup(){


        if(this.refs.projectMenu.classList.contains('js-active')){
            this.refs.projectMenu.classList.remove('js-active')
        }else{
            this.refs.projectMenu.classList.add('js-active')
        }
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

        const roundedTime = () =>{

            Math.round(totalTime)

            const date = new Date(totalTime);

            const days = date.getDate() - 1

            let hours = (days * 24) + date.getHours() -1;

            let minutes = date.getMinutes();

            const seconds = date.getSeconds();

            if (minutes < 30 && minutes > 15) {
                minutes = 30
            }else {

                if (minutes > 30 && minutes < 45) {
                    // hours++
                    minutes = 45
                }else {
                    if (minutes > 45 ) {
                        hours++
                        minutes = 0
                    }
                }
            }
            if(minutes !== 0) {
                return `${hours}h ${minutes}min`
            }else {
                return `${hours}h`
            }
        }

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
            <div className={`project ${trackerRunning() ? 'running' : ''}`} style={doStyle()} id={project.created} ref={(e)=>{if(e){this.project = e}}}>


                <div className="top flex row justify-between align-center">
                    <div><h1>{project.title}</h1></div>

                    <ul className="flex row justify-end align-center">
                        <li><i className={`material-icons schedule `}>schedule</i></li>
                        <li><h2>{trackerRunning() ? timeFilter(totalTime) : roundedTime() }</h2></li>
                    </ul>
                </div>

                <div className="flex column">
                {project.trackers.map((tracker, i)=>{
                    if(!this.state.minimised) {
                        return <Tracker key={i} index={i} project={project} tracker={tracker}/>
                    }else {
                        if(i === project.trackers.length -1){
                            return <Tracker key={i} index={i} project={project} tracker={tracker}/>
                        }
                    }
                })}
                </div>

                {project.trackers.length > 1 &&

                    <div className="expand flex row justify-around">
                    {this.state.minimised ?
                        <i onClick={this.toggleMinimised.bind(this)} title="Expand" className="material-icons">
                            keyboard_arrow_down
                        </i>
                        :
                        <i onClick={this.toggleMinimised.bind(this)} title="collapse" className="material-icons">
                            keyboard_arrow_up
                        </i>
                    }
                    </div>
                }


                <div className="">
                    {/*<button onClick={()=>{this.addTracker(project.created)}}><span><i className="material-icons button">add</i>Tracker</span></button>*/}

                    {/*<span className="abs middle right" title={project.fullWidth ? 'Minimise' : 'Maximise'} onClick={()=>{this.toggleFullWidth(project)}}><i className="material-icons crop">{project.fullWidth ? 'crop_3_2' : 'crop_7_5'}</i></span>*/}



                </div>


                {/*<div className="circle" onClick={()=>{this.addTracker(project.created)}}><i className="material-icons abs middle">add</i></div>*/}


                <ul className="bottom flex row justify-between align-center">
                    {!this.ticker ?
                        <li>
                            <button title="Start Tracking" onClick={() => {
                                this.start(project.created, project.trackers[project.trackers.length - 1].created)
                            }}><i className="material-icons abs middle left">play_arrow</i>
                                <span>Start</span>
                            </button>
                        </li>
                        :
                        <li>
                            <button title="Stop Tracking" className="running" onClick={() => {
                                this.stop(project.created, project.trackers[project.trackers.length - 1].created)
                            }}><i className="material-icons abs middle left">stop</i>
                                <span>Stop</span>
                            </button>
                        </li>
                    }


                    <li onClick={this.togglePopup.bind(this)}><i className="material-icons dots">more_horiz</i></li>



                </ul>


                <ul className="popup drop-shadow flex column" onMouseLeave={this.togglePopup.bind(this)} ref="projectMenu">
                    <li onClick={()=>{this.handleRemove(project.created)}}>{`Delete ${project.title}`}</li>
                    <li onClick={()=>{this.handleExport(project)}}>Export</li>
                    <li><hr/></li>
                    <li onClick={()=>{this.addTracker(project.created)}}>Add Tracker</li>
                    <li onClick={()=>{this.filterBlank()}} >Filter Blank</li>
                </ul>


            </div>
        )
    }
}