import React from "react"
import { connect } from "react-redux"
import { bindActionCreators } from "redux"
import * as actions from "../actions"

import TasksContainer from "../containers/Tasks.container"

import NavBar from "./NavBar"
import Filter from "../components/Filter.component"

const renderTasksLayout = props => {
	return (
		<>
			<NavBar />
			<div className='sub-nav'>
				<Filter {...props} />
			</div>

			<main>
				<TasksContainer {...props} />
			</main>
		</>
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

const Tasks = connect(
	mapStateToProps,
	mapDispatchToProps
)(renderTasksLayout)
export default Tasks
