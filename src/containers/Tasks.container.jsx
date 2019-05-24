import React from "react"
import { connect } from "react-redux"
import { bindActionCreators } from "redux"
import * as actions from "../actions"

import Task from "../components/Task.component"

const renderTasks = props => {
	const projectUID =
		(props.match && props.match.params && props.match.params.uid) ||
		props.uid ||
		props.projects[0].uid

	// const thisProject = projects.filter(
	// 	project => project.uid === projectUID
	// )[0]

	return (
		<main>
			<div className='tasks container list'>
				{props.tasks
					.filter(task => task.project === projectUID)
					.map(task => {
						return (
							<Task
								{...task}
								{...props}
								trackers={props.trackers.filter(tr => tr.task === task.uid)}
								tasks={props.tasks.filter(t => t.project === projectUID)}
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

const TasksContainer = connect(
	mapStateToProps,
	mapDispatchToProps
)(renderTasks)
export default TasksContainer
