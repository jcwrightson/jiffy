import React from "react"
import { connect } from "react-redux"
import { push } from "react-router-redux"
import { withRouter, Link } from "react-router-dom"

import { removeProject, createProject } from "../actions/Project.actions"

import Project from "../components/Project.component"

const renderProjects = ({
	projects,
	tasks,
	trackers,
	removeProject,
	createProject,
	push
}) => {
	return (
		<div className='projects-container'>
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
						push={push}
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
		removeProject: uid => {
			dispatch(removeProject(uid))
		},
		createProject: () => {
			dispatch(createProject())
		},
		push: path => {
			dispatch(push(path))
		}
	}
}

const ProjectsContainer = connect(
	mapStateToProps,
	mapDispatchToProps
)(renderProjects)

export default ProjectsContainer
