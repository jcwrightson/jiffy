import React from "react"
import { connect } from "react-redux"
import { bindActionCreators } from "redux"
import * as actions from "../actions"

import Task from "../components/Task.component"

const renderTasks = ({
	projects,
	tasks,
	trackers,
	match,
	createTask,
	createTracker,
	removeTask,
	handleEditTask,
	toggleEditTask,
	startTask,
	stopTask
}) => {
	const thisProject = projects.filter(
		project => project.uid === match.params.uid
	)[0]

	return (
		<main>
			{/* <div className='container title'>
				<Link to='/'>
					<h1>{thisProject.title}</h1>
				</Link>
				<hr />
			</div> */}
			<div className='tasks container list'>
				{tasks
					.filter(task => task.project === match.params.uid)
					.map(task => {
						return (
							<Task
								trackers={trackers.filter(tr => tr.task === task.uid)}
								tasks={tasks.filter(t => t.project === match.params.uid)}
								task={task}
								key={task.uid}
								createTask={createTask}
								createTracker={createTracker}
								removeTask={removeTask}
								handleEditTask={handleEditTask}
								toggleEditTask={toggleEditTask}
								startTask={startTask}
								stopTask={stopTask}
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
