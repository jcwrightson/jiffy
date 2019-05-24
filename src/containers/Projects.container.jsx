import React from "react"
import { connect } from "react-redux"
import { bindActionCreators } from "redux"
import * as actions from "../actions"

import Project from "../components/Project.component"

const renderProjects = props => {
	// console.log(props.includeArchived)
	return (
		<div className='projects container list'>
			{props.projects.map(project => {
				return (
					<Project
						{...project}
						{...props}
						trackers={props.trackers.filter(
							tracker => tracker.project === project.uid
						)}
						tasks={props.tasks.filter(task => task.project === project.uid)}
						key={project.uid}
					/>
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

const ProjectsContainer = connect(
	mapStateToProps,
	mapDispatchToProps
)(renderProjects)

export default ProjectsContainer
