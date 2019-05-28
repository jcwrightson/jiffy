import React from "react"
import { connect } from "react-redux"
import { bindActionCreators } from "redux"
import * as actions from "../actions"

import Task from "../components/Task.component"
import Filter from "../components/Filter.component"

const renderTasks = props => {
	return (
		<main>
			<header className='title'>
				<h1>Tasks</h1>
			</header>

			<div className='tasks container list'>
				<Filter
					projects={props.projects}
					filterByProject={props.filterByProject}
					showArchived={props.showArchived}
					selectFilterByProject={props.selectFilterByProject}
					toggleShowArchived={props.toggleShowArchived}
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

const filterArchivedTasks = (tasks, showArchived) => {
	if (!showArchived) {
		return tasks.filter(task => !task.archived)
	}

	return tasks
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
		tasks: filterArchivedTasks(
			filterTasksByProject(state.tasks.list, state.tasks.filterByProject),
			state.tasks.showArchived
		),
		filterByProject: state.tasks.filterByProject,
		showArchived: state.tasks.showArchived,
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
