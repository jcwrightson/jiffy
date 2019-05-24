import React from "react"
import { connect } from "react-redux"
import { bindActionCreators } from "redux"
import * as actions from "../actions"

import Task from "../components/Task.component"

const renderTasks = props => {
	return (
		<main>
			<header className='title'>
				<h1>All Tasks</h1>
			</header>
			<div className='tasks container list'>
				{props.tasks.map(task => {
					return (
						<Task
							{...task}
							{...props}
							trackers={props.trackers.filter(tr => tr.task === task.uid)}
							tasks={props.tasks}
							key={task.uid}
						/>
					)
				})}
			</div>
		</main>
	)
}

const mapStateToProps = state => {
	return {
		projects: state.projects.list,
		tasks: state.tasks.list,
		trackers: state.trackers.list
	}
}

const mapDispatchToProps = dispatch => {
	return {
		...bindActionCreators(actions, dispatch)
	}
}

const AllTasksContainer = connect(
	mapStateToProps,
	mapDispatchToProps
)(renderTasks)
export default AllTasksContainer
