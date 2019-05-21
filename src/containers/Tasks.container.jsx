import React, { Component } from "react"
import { connect } from "react-redux"
import { createTracker, removeTask, createTask } from "../actions"
import { store } from "../store"

import Task from "../components/Task.component"
import { push } from "connected-react-router"

const renderTasks = ({
	tasks,
	trackers,
	match,
	createTask,
	createTracker,
	toggleRunning,
	removeTask
}) => {
	return (
		<main className='container'>
			<div className='tasks'>
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
		createTask: uid => {
			dispatch(createTask(uid))
		},
		createTracker: (projectUID, taskUID) => {
			dispatch(createTracker(projectUID, taskUID))
		},
		removeTask: uid => {
			dispatch(removeTask(uid))
		},
		toggleRunning: (taskUID, trackerUID) => {
			dispatch({
				type: "TOGGLE_RUNNING",
				payload: { task: taskUID, tracker: trackerUID }
			})
		}
	}
}
const TasksContainer = connect(
	mapStateToProps,
	mapDispatchToProps
)(renderTasks)
export default TasksContainer
