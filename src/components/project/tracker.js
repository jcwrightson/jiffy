import React, { Component } from 'react'
import ReactDOM from 'react-dom'

import {dayOfWeekfromNum, timeFilter} from "../../functions";


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
        this.reset = this.reset.bind(this)

    }

    start(project, tracker){

        if(!this.props.tracker.running){

            store.dispatch({type: 'TOGGLE_RUNNING', payload: {project: project, tracker: tracker}})
            let midnight = false

            this.ticker = setInterval(()=>{

                const time = new Date(Date.now())


                if(time.getHours() + time.getMinutes() === 0 && !midnight){

                    clearInterval(this.ticker)
                    midnight = true

                    setTimeout(()=>{
                        midnight = false
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

        store.dispatch({type: 'TOGGLE_RUNNING', payload: {project: project, tracker: tracker}})

    }

    reset(project, tracker){
        if(this.props.tracker.running) {
            this.stop(project, tracker)
        }

        store.dispatch({type:'RESET_TRACKER', payload: {project: project, tracker: tracker}})
    }

    transEnd(){
        console.log('ended')
    }

    handleRemove(project, tracker){

        if(this.ticker) {
            this.stop(tracker)
        }

        store.dispatch({type:'REMOVE_TRACKER', payload: {project: project, tracker:tracker}})



    }


    DateTimeFilter(stamp){

        const date = new Date(stamp)
        const hours = date.getHours() - 1
        const day = date.getDay()
        const dayOfMonth = date.getDate()
        const month = date.getMonth() + 1
        const year = date.getFullYear()
        const minutes = "0" + date.getMinutes()

        const seconds = "0" + date.getSeconds()

        const formattedTime = hours + ':' + minutes.substr(-2) + ':' + seconds.substr(-2);
        const dateTime = `${dayOfWeekfromNum(day).short} ${dayOfMonth}/${month}/${year}`
        return dateTime


    }




    render(){

        const { project, tracker, index } = this.props

        const isToday = ()=>{
            const date = new Date(tracker.created)
            const today = new Date(Date.now())

            return today.getDate() + today.getMonth() === date.getDate() + date.getMonth()

        }

        return(
            <div className="tracker" id={tracker.created} ref={(e)=>{if(e){this.tracker = e}}}>
                <ul className="meta abs middle left">
                    <li><label className={`${tracker.running ? 'running': ''}`}>{isToday() ? 'Today' : this.DateTimeFilter(tracker.created)}</label></li>
                    <li className="time"><label><span className={`${tracker.running ? 'running': ''}`} ><i className={`material-icons inline`}>schedule</i>{timeFilter(tracker.time)}</span></label></li>
                </ul>

                {/*<ul className="abs middle">*/}
                    {/*<li><label className={`${tracker.running ? 'running': ''}`}><span className={`${tracker.running ? 'running': ''}`}><i className={`material-icons inline`}>schedule</i></span>{timeFilter(tracker.time)}</label></li>*/}
                {/*</ul>*/}

                <ul className="abs middle right">
                {!tracker.running ?
                    <li>
                        <button disabled={isToday()? false : true} onClick={() => {
                            this.start(project.created, tracker.created)
                        }}><span><i className="material-icons button">play_arrow</i>Start</span>
                        </button>
                    </li>
                    :
                    <li>
                        <button className="running" onClick={() => {
                            this.stop(project.created, tracker.created)
                        }}><span><i className="material-icons button">stop</i>Stop</span>
                        </button>
                    </li>
                }

                    <li>
                        <button disabled={tracker.time > 0 && isToday() ? false : true} title="Clear" onClick={() => {
                            this.reset(project.created, tracker.created)
                        }}><span><i className="material-icons button">restore</i>Reset</span>
                        </button>
                    </li>

                </ul>



            </div>
        )
    }
}