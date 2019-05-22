import React, { Component } from "react"
import ProjectsContainer from "../containers/Projects.container"
import { connect } from "react-redux"
import { store } from "../store"
import { createProject } from "../actions"

import QueryProjects from "../components/QueryProjects.component"
import QuickTask from "../components/QuickTask"
class renderHome extends Component {
	constructor(props) {
		super(props)
	}

	render() {
		return (
			<main>
				<div className='container title'>
					<h1>Projects</h1>
					<hr />
				</div>
				<QuickTask/>
				<QueryProjects />
				<ProjectsContainer />
			</main>
		)
	}
}

const mapStateToProps = state => {
	return {
		projects: state.projects.list
	}
}

const Home = connect(mapStateToProps)(renderHome)
export default Home
