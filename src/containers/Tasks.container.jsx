import React, { Component } from "react"
import { connect } from "react-redux"
import { Link } from "react-router-dom"

import { store } from "../store"

import { bindActionCreators } from "redux"
import * as actions from "../actions/"

import Task from "../components/Task.component"
import { push } from "connected-react-router"

const renderTasks = ({
	projects,
	tasks,
	trackers,
	match,
	createTask,
	createTracker,
	toggleRunning,
	removeTask,
	handleEdit,
	toggleEdit
}) => {
	const thisProject = projects.filter(
		project => project.uid === match.params.uid
	)[0]

	return (
		<main>
			<div className='container title'>
				<Link to='/'>
					<h1>{thisProject.title}</h1>
				</Link>
				<hr />
			</div>
			<div className='tasks container'>
				{tasks
					.filter(task => task.project === match.params.uid)
					.map(task => {
						return (
							<Task
								trackers={trackers.filter(tracker => tracker.task === task.uid)}
								tasks={tasks.filter(task => task.project === match.params.uid)}
								task={task}
								key={task.uid}
								createTask={createTask}
								createTracker={createTracker}
								removeTask={removeTask}
								handleEdit={handleEdit}
								toggleEdit={toggleEdit}
								toggleRunning={toggleRunning}
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
