import React from "react"
import { connect } from "react-redux"
import { bindActionCreators } from "redux"
import * as actions from "../actions"
import { timeFilter, DateTimeFilter, getAggregate } from "../lib/functions"
// import SVG from "./SVG.component"
import Filter from "../components/Filter.component"

const renderTimesheet = ({
	projects,
	tasks,
	trackers,
	timesheet,
	selectTimesheetProject
}) => {
	const getTaskFromUID = uid => {
		return tasks.list.filter(task => task.uid === uid)[0]
	}
	return (
		<main>
			<div className='timesheet container'>
				<header className='title' />
				<Filter
					projects={projects.list}
					filterByProject={timesheet.project}
					selectFilterByProject={selectTimesheetProject}
					showCompleted
					toggleShowCompleted={() => {}}
				/>

				<div className='list container'>
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

const filterByProject = (project, collection) => {
	if (project !== "all") {
		return collection.filter(itme => itme.project === project)
	}
	return collection
}

const mapStateToProps = state => {
	return {
		projects: state.projects,
		tasks: state.tasks,
		trackers: filterByProject(state.timesheet.project, state.trackers.list),
		timesheet: state.timesheet
	}
}

const mapDispatchToProps = dispatch => {
	return {
		...bindActionCreators(actions, dispatch)
	}
}

const TimesheetContainer = connect(
	mapStateToProps,
	mapDispatchToProps
)(renderTimesheet)
export default TimesheetContainer
