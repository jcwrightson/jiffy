import React from "react"
import { connect } from "react-redux"
import { bindActionCreators } from "redux"
import * as actions from "../actions"

import Project from "../components/Project.component"
import Task from "../components/Task.component"

const renderCombined = props => {
	return (
		<div className='projects container list'>
			{props.projects.map(project => {
				return (
					<div key={project.uid}>
						<Project
							{...props}
							{...project}
							trackers={props.trackers.filter(
								tracker => tracker.project === project.uid
							)}
							tasks={props.tasks.filter(task => task.project === project.uid)}
						/>

						{props.tasks
							.filter(task => task.project === project.uid)
							.map(task => {
								return (
									<Task
										{...props}
										{...task}
										trackers={props.trackers.filter(tr => tr.task === task.uid)}
										tasks={props.tasks.filter(t => t.project === project.uid)}
										key={task.uid}
									/>
								)
							})}
					</div>
				)
			})}
		</div>
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

const CombinedContainer = connect(
	mapStateToProps,
	mapDispatchToProps
)(renderCombined)

export default CombinedContainer
