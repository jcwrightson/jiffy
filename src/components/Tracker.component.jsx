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

const ticker = (updateTracker, tracker, createTracker, start) => {
	const time = new Date(Date.now())
	if (time.getHours() + time.getMinutes() === 0 && !midnight) {
		clearInterval(window.__tracker__[tracker.uid].tick)
		window.__tracker__[tracker.uid].midnight = true

		setTimeout(() => {
			window.__tracker__[tracker.uid].midnight = false
		}, 60000)

		toggleRunning(task.uid, tracker.uid)
		createTracker(tracker.project, tracker.task)
		start()
	} else {
		updateTracker(tracker.uid, 1000)
	}
}

const renderTracker = ({
	task,
	tracker,
	deleteTracker,
	toggleRunning,
	updateTracker,
	createTracker
}) => {
	if (!window.__tracker__[tracker.uid]) {
		window.__tracker__[tracker.uid] = {
			tick: null,
			midnight: null
		}
	}
	const start = () => {
		window.__tracker__[tracker.uid].tick = setInterval(() => {
			ticker(updateTracker, tracker, createTracker, start)
		}, 1000)
	}

	const stop = () => {
		clearInterval(window.__tracker__[tracker.uid].tick)
	}

	return (
		<div className='tracker'>
			<ul className='meta flex row justify-between'>
				<li>
					{isToday(tracker.created) ? "Today" : DateTimeFilter(tracker.created)}
				</li>
				<li>{timeFilter(tracker.time)}</li>
			</ul>
			<div className='flex row justify-end'>
				{/* <button
					onClick={() => {
						stop()
						deleteTracker(tracker.uid)
						window.__tracker__[tracker.uid] = null
					}}>
					Delete
				</button> */}
        <button
							onClick={() => {
								if (!tracker.running) {
									start()
									toggleRunning(task.uid, tracker.uid)
								} else {
									stop()
									toggleRunning(task.uid, tracker.uid)
								}
							}}>
							{tracker.running ? "Stop" : "Start"}
						</button>
			</div>
		</div>
	)
}

const mapDispatchToProps = dispatch => {
	return {
		deleteTracker: uid => {
			dispatch({ type: "REMOVE_TRACKER", payload: uid })
		},
		toggleRunning: (taskUID, trackerUID) => {
			dispatch({ type: "TOGGLE_RUNNING", payload: {task: taskUID, tracker: trackerUID} })
		},
		updateTracker: uid => {
			dispatch({ type: "UPDATE_TRACKER", payload: { uid: uid, time: 1000 } })
		},
		createTracker: (projectUID, taskUID) => {
			dispatch(createTracker(projectUID, taskUID))
		}
	}
}

const Tracker = connect(
	null,
	mapDispatchToProps
)(renderTracker)
export default Tracker
