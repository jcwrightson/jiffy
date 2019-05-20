import React, { Component } from "react"
import { store } from "../store"
import { connect } from "react-redux"
import { dayOfWeekfromNum, timeFilter, isToday } from "../lib/functions"

window.__tracker__ = {}

const DateTimeFilter = stamp => {
	const date = new Date(stamp)
	const day = date.getDay()
	const dayOfMonth = date.getDate()
	const month = date.getMonth() + 1
	const year = date.getFullYear()
	const dateTime = `${
		dayOfWeekfromNum(day).short
	} ${dayOfMonth}/${month}/${year}`
	return dateTime
}

const TrackerMarkup = ({ created, time }) => {
	return (
		<ul>
			<li>{isToday(created) ? "Today" : DateTimeFilter(created)}</li>
			<li>{timeFilter(time)}</li>
		</ul>
	)
}

const ticker = (updateTracker, tracker) => {
	const time = new Date(Date.now())
	if (time.getHours() + time.getMinutes() === 0 && !midnight) {
		clearInterval(window.__tracker__[tracker.uid].tick)
		window.__tracker__[tracker.uid].midnight = true

		setTimeout(() => {
			window.__tracker__[tracker.uid].midnight = false
		}, 60000)

		toggleRunning(tracker.uid)

		// tracker = Date.now()
		// store.dispatch({
		// 	type: "ADD_TRACKER",
		// 	payload: { task: task, created: tracker }
		// })
		// start(task, tracker)
	} else {
		updateTracker(tracker.uid, 1000)
	}
}

const renderTracker = ({
	task,
	tracker,
	deleteTracker,
	toggleRunning,
	updateTracker
}) => {

  if(!window.__tracker__[tracker.uid]){
    window.__tracker__[tracker.uid] = {
      tick: null,
      midnight: null
    }
  }
	const start = () => {
			window.__tracker__[tracker.uid].tick = setInterval(() => {
				ticker(updateTracker, tracker)
			}, 1000)
	}

	const stop = () => {
		clearInterval(window.__tracker__[tracker.uid].tick)
	}

	return (
		<div>
			<TrackerMarkup {...tracker} />
			<button
				onClick={() => {
					if (!tracker.running) {
						start()
						toggleRunning(tracker.uid)
					} else {
						stop()
						toggleRunning(tracker.uid)
					}
				}}>
				{tracker.running ? "Stop" : "Start"}
			</button>
			<button
				onClick={() => {
          stop()
          deleteTracker(tracker.uid)
          window.__tracker__[tracker.uid] = null
				}}>
				Delete
			</button>
		</div>
	)
}

const mapDispatchToProps = dispatch => {
	return {
		deleteTracker: uid => {
			dispatch({ type: "REMOVE_TRACKER", payload: uid })
		},
		toggleRunning: uid => {
			dispatch({ type: "TOGGLE_RUNNING", payload: uid })
		},
		updateTracker: uid => {
			dispatch({ type: "UPDATE_TRACKER", payload: { uid: uid, time: 1000 } })
		}
	}
}

const Tracker = connect(
	null,
	mapDispatchToProps
)(renderTracker)
export default Tracker
