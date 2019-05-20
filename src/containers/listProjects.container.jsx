import React from "react"
import { connect } from "react-redux"
import { withRouter, Link } from "react-router-dom"

import {removeProject} from "../actions/Project.actions"

const listProjects = ({ projects, removeProject }) => {
	return (
		<ul>
			{projects.map(project => {
				return (
					<li key={project.uid}>
						<Link to={`projects/${project.uid}`}>{project.uid}</Link>
						<button onClick={
							()=>removeProject(project.uid)
						}>REMOVE PROJECT</button>
					</li>
				)
			})}
		</ul>
	)
}

const mapStateToProps = state => {
	return {
		projects: state.newProjects.list
	}
}

const mapDispatchToProps = dispatch => {
	return {
		removeProject: uid => {
			dispatch(removeProject(uid))
		}
	}
}

const ListProjects = withRouter(connect(mapStateToProps, mapDispatchToProps)(listProjects))
export default ListProjects
