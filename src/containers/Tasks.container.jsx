import React from "react"
import { connect } from "react-redux"
import { bindActionCreators } from "redux"
import * as actions from "../actions"

import Task from "../components/Task.component"
import Filter from "../components/Filter.component"

const renderTasks = props => {
	return (
		<main>
			<header className='title' />

			<div className='tasks container list'>
				<Filter
					projects={props.projects}
					filterByProject={props.filterByProject}
					showCompleted={props.showCompleted}
					selectFilterByProject={props.selectFilterByProject}
					toggleShowCompleted={props.toggleShowCompleted}
				/>
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

const filterCompletedTasks = (tasks, showCompleted) => {
	if (showCompleted) {
		const completed = tasks.filter(task => task.completed)
		const toDo = tasks.filter(task => !task.completed)
		return [...toDo, ...completed]
	}

	return tasks.filter(task => !task.completed)
}

const filterTasksByProject = (tasks, project) => {
	if (project !== "all") {
		return tasks.filter(task => task.project === project)
	}

	return tasks
}

const mapStateToProps = state => {
	return {
		projects: state.projects.list,
		tasks: filterCompletedTasks(
			filterTasksByProject(state.tasks.list, state.tasks.filterByProject),
			state.tasks.showCompleted
		),
		filterByProject: state.tasks.filterByProject,
		showArchived: state.tasks.showArchived,
		showCompleted: state.tasks.showCompleted,
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
