import React from "react"
import { connect } from "react-redux"
import { bindActionCreators } from "redux"
import * as actions from "../actions"

import NavBar from "./NavBar"
import TimesheetContainer from "../containers/Timesheet.container"
import Filter from "../components/Filter.component"

const renderTimesheets = props => {
	return (
		<>
			<NavBar />
			<div className='sub-nav'>
				<Filter
					projects={props.projects.list}
					filterByProject={props.timesheet.project}
					selectFilterByProject={props.selectTimesheetProject}
					showCompleted={props.showCompleted}
					toggleShowCompleted={() => {}}
				/>
			</div>
			<main>
				<TimesheetContainer tasks={props.tasks} trackers={props.trackers} />
			</main>
		</>
	)
}

const filterByProject = (project, collection) => {
	if (project !== "all") {
		return collection.filter(item => item.project === project)
	}
	return collection
}

const filterNoTime = collection => {
	return collection.filter(item => item.time > 0)
}

const mapStateToProps = state => {
	return {
		projects: state.projects,
		tasks: state.tasks,
		trackers: filterByProject(
			state.timesheet.project,
			filterNoTime(state.trackers.list)
		),
		timesheet: state.timesheet
	}
}

const mapDispatchToProps = dispatch => {
	return {
		...bindActionCreators(actions, dispatch)
	}
}

const Timesheets = connect(
	mapStateToProps,
	mapDispatchToProps
)(renderTimesheets)
export default Timesheets
