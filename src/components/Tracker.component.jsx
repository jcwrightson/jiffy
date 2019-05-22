import React from "react"
import {
	dayOfWeekfromNum,
	timeFilter,
	isToday,
	DateTimeFilter
} from "../lib/functions"

// const ticker = (updateTracker, tracker, createTracker, start) => {
// 	const time = new Date(Date.now())
// 	if (time.getHours() + time.getMinutes() === 0 && !midnight) {
// 		clearInterval(window.__tracker__[tracker.uid].tick)
// 		window.__tracker__[tracker.uid].midnight = true

// 		setTimeout(() => {
// 			window.__tracker__[tracker.uid].midnight = false
// 		}, 60000)

// 		createTracker(tracker.project, tracker.task)
// 		toggleRunning(task.uid, tracker.uid)
// 	} else {
// 		updateTracker(tracker.uid, 1000)
// 	}
// }

const Tracker = ({ tracker }) => {
	return (
		<div className='tracker'>
			<ul className='meta flex-row'>
				<li>
					{isToday(tracker.created) ? "Today" : DateTimeFilter(tracker.created)}
				</li>
				<li>{timeFilter(tracker.time)}</li>
			</ul>
		</div>
	)
}

export default Tracker
