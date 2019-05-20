import React, { Component } from "react"
import { dayOfWeekfromNum, timeFilter, isToday } from "../functions"
import store from "../store"

export default class Project extends Component {
  constructor(props) {
    super(props)

    this.state = {
      time: 0,
      style: {
        opacity: 0
      }
    }

    this.midnight = false
    this.handleRemove = this.handleRemove.bind(this)
  }

  handleRemove(project, tracker) {
    if (this.ticker) {
      this.stop(tracker)
    }

    store.dispatch({
      type: "REMOVE_TRACKER",
      payload: { project: project, tracker: tracker }
    })
  }

  DateTimeFilter(stamp) {
    const date = new Date(stamp)
    // const hours = date.getHours() - 1
    const day = date.getDay()
    const dayOfMonth = date.getDate()
    const month = date.getMonth() + 1
    const year = date.getFullYear()
    // const minutes = "0" + date.getMinutes()

    // const seconds = "0" + date.getSeconds()

    // const formattedTime =
    //   hours + ":" + minutes.substr(-2) + ":" + seconds.substr(-2)
    const dateTime = `${
      dayOfWeekfromNum(day).short
    } ${dayOfMonth}/${month}/${year}`
    return dateTime
  }

  render() {
    const { tracker } = this.props

    return (
      <div
        className="tracker"
        id={tracker.created}
        ref={e => {
          if (e) {
            this.tracker = e
          }
        }}
      >
        <ul className="flex row justify-between align-center">
          <li>
            <label
              className={`${
                tracker.running && isToday(tracker) ? "running" : ""
              }`}
            >
              {isToday(tracker)
                ? "Today"
                : this.DateTimeFilter(tracker.created)}
            </label>
          </li>
          <li className="time">
            <label>
              <span
                className={`${
                  tracker.running && isToday(tracker) ? "running" : ""
                }`}
              >
                {timeFilter(tracker.time)}
              </span>
            </label>
          </li>
        </ul>
      </div>
    )
  }
}
