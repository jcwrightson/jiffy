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

            this.ticker = setInterval(()=>{

                store.dispatch({type:'UPDATE_TRACKER', payload: {project: project, tracker: tracker, time: 1000}})


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
        const minutes = "0" + date.getMinutes()

        const seconds = "0" + date.getSeconds()

        const formattedTime = hours + ':' + minutes.substr(-2) + ':' + seconds.substr(-2);
        const dateTime = `${dayOfWeekfromNum(day).short} ${dayOfMonth} ${month}`
        return dateTime


    }




    render(){

        const { project, tracker, index } = this.props

        return(
            <div className="tracker" id={tracker.created} ref={(e)=>{if(e){this.tracker = e}}}>
                <ul className="abs middle left">
                    <li>{this.DateTimeFilter(tracker.created)}</li>
                    <li>{timeFilter(tracker.time)}</li>
                </ul>

                <ul className="abs middle right">
                {!tracker.running ?
                    <li>
                        <button onClick={() => {
                            this.start(project.created, tracker.created)
                        }}>Start
                        </button>
                    </li>
                    :
                    <li>
                        <button className="running" onClick={() => {
                            this.stop(project.created, tracker.created)
                        }}>Stop
                        </button>
                    </li>
                }


                {index > 0 ?
                    <li>
                        <button title="Remove" className="delete" onClick={() => {
                            this.handleRemove(project.created, tracker.created)
                        }}>Delete
                        </button>
                    </li>
                    :
                    <li>
                        <button disabled={tracker.time > 0 ? false : true} title="Clear" onClick={() => {
                            this.reset(project.created, tracker.created)
                        }}>Reset
                        </button>
                    </li>
                }

                </ul>

            </div>
        )
    }
}