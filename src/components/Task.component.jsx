import React, { Component } from "react"
import Tracker from "./Tracker.component"
import { timeFilter } from "../functions"
import { store } from "../store"
import { connect } from "react-redux"
import { createTracker } from "../actions/Tracker.actions"
import { removeTask } from "../actions/Task.actions"

class renderTask extends Component {
	constructor(props) {
		super(props)
	}

	render() {
		const { task, trackers, addTracker, removeTask } = this.props
		return (
			<div>
				TASK {task.uid}{" "}
				<button
					onClick={() => {
						addTracker(task.project, task.uid)
					}}>
					ADD TRACKER
				</button>{" "}
				<button
					onClick={() => {
						removeTask(task.uid)
					}}>
					REMOVE TASK
				</button>
				<div>
					{trackers.list
						.filter(tracker => tracker.task === task.uid)
						.map(tracker => {
							return <Tracker tracker={tracker} task={task} key={tracker.uid} />
						})}
				</div>
			</div>
		)
	}
}

const mapStateToProps = state => {
	return {
		trackers: state.trackers
	}
}

const mapDispatchToProps = dispatch => {
	return {
		addTracker: (projectUID, taskUID) => {
			dispatch(createTracker(projectUID, taskUID))
		},
		removeTask: uid => {
			dispatch(removeTask(uid))
		}
	}
}

const Task = connect(mapStateToProps, mapDispatchToProps)(renderTask)

export default Task
