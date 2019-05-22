import React from "react"
import { connect } from "react-redux"
import { push } from "react-router-redux"
import { withRouter, Link } from "react-router-dom"

import { bindActionCreators } from "redux"
import * as actions from "../actions/"

import Project from "../components/Project.component"
import { store } from "../store"

const renderProjects = ({
	projects,
	tasks,
	trackers,
	removeProject,
	createProject,
	handleEditProject,
	toggleEditProject
}) => {
	return (
		<div className='projects container list'>
			{projects.map(project => {
				return (
					<Project
						trackers={trackers.filter(
							tracker => tracker.project === project.uid
						)}
						tasks={tasks.filter(task => task.project === project.uid)}
						key={project.uid}
						removeProject={removeProject}
						createProject={createProject}
						handleEditProject={handleEditProject}
						toggleEditProject={toggleEditProject}
						{...project}
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
