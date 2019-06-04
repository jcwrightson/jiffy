import React from "react"
import { timeFilter, DateTimeFilter, getAggregate } from "../lib/functions"

const TimesheetContainer = ({ tasks, trackers }) => {
	const getTaskFromUID = uid => {
		return tasks.list.filter(task => task.uid === uid)[0]
	}
	return (
		<main>
			<div className='timesheet container'>
				<header className='title' />

				<div className='list container'>
					<article className='flex-row head'>
						<span>Date</span>
						<span>Task</span>
						<span>Time</span>
					</article>
					{trackers.map(tracker => {
						return (
							<article className='flex-row' key={tracker.uid}>
								<span>{DateTimeFilter(tracker.created)}</span>
								<span>{getTaskFromUID(tracker.task).title}</span>
								<span>{timeFilter(tracker.time)}</span>
							</article>
						)
					})}
					<article className='flex-row totals'>
						<span>
							<h1>Total</h1>
						</span>
						<span className='agg'>
							{timeFilter(getAggregate(trackers, "time"))}
						</span>
					</article>
				</div>
			</div>
		</main>
	)
}

export default TimesheetContainer
