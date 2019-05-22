import React from "react"
import { connect } from "react-redux"

import { bindActionCreators } from "redux"
import * as actions from "../actions"

import { uuidv4 } from "../lib/functions"

const renderQuickTask = ({
	createTask,
	createProject,
	projects,
	startTask,
	stopTask,
	tasks
}) => {
	const createQuickTask = () => {
		const projectUID = uuidv4()
		const taskUID = uuidv4()
		createProject(document.querySelector("#project").value, projectUID)
		createTask(projectUID, document.querySelector("#task").value, null, taskUID)
		startTask(taskUID)
	}
	return (
		<div className='flex-row'>
			<input id='task' type='text' placeholder="I'm working on..." />
			<input id='project' type='text' placeholder='Project / Client' />
			<select>
				<option>Select...</option>
				{projects.map(project => {
					return (
						<option value={project.uid} key={project.uid}>
							{project.title}
						</option>
					)
				})}
			</select>
			<button type='button' className='primary' onClick={createQuickTask}>
				Start
			</button>
		</div>
	)
}

const mapStateToProps = state => {
	return {
		projects: state.projects.list,
		query: state.projects.query,
		tasks: state.tasks.list
	}
}

const mapDispatchToProps = dispatch => {
	return {
		...bindActionCreators(actions, dispatch)
	}
}

const QuickTask = connect(
	mapStateToProps,
	mapDispatchToProps
)(renderQuickTask)
export default QuickTask
