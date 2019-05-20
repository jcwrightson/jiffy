import React, { Component } from "react"
import ListProjects from "../containers/ListProjects.container"
import { connect } from "react-redux"
import { store } from "../store"
import { createProject } from "../actions"

import "../sass/styles.scss"

class renderHome extends Component {
	constructor(props) {
		super(props)

		this.onUnload = this.onUnload.bind(this)
	}

	handleCreate() {
		store.dispatch(createProject("test"))
	}

	onUnload() {
		localStorage.setItem("tracker-2", JSON.stringify(this.props.projects))
	}

	

	render() {
		return (
			<div>
				<ListProjects />
				<button onClick={this.handleCreate.bind(this)}>Create</button>
			</div>
		)
	}
}

const mapStateToProps = state => {
	return {
		projects: state.newProjects.list
	}
}

const Home = connect(mapStateToProps)(renderHome)
export default Home
