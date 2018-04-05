import React, { Component } from 'react'
import ReactDOM from 'react-dom'

import {dayOfWeekfromNum, timeFilter, isToday} from "../../functions";


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
        this.midnight = false

    }

    start(project, tracker){



        if(!this.props.tracker.running){

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


        return(
            <div className="tracker" id={tracker.created} ref={(e)=>{if(e){this.tracker = e}}}>
                <ul className="meta">
                    <li><label className={`${tracker.running && isToday(tracker) ? 'running': ''}`}>{isToday(tracker) ? 'Today' : this.DateTimeFilter(tracker.created)}</label></li>
                    <li className="time"><label><span className={`${tracker.running && isToday(tracker) ? 'running': ''}`} >{timeFilter(tracker.time)}</span></label></li>
                </ul>
            </div>
        )
    }
}