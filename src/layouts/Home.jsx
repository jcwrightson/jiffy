import React, { Component } from "react"
import ProjectsContainer from "../containers/Projects.container"
import { connect } from "react-redux"
import { store } from "../store"
import { createProject } from "../actions"
class renderHome extends Component {
	constructor(props) {
		super(props)
	}

	render() {
		return (
			<main className='home container'>
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
