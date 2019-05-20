import React, { Component } from "react"
import { connect } from "react-redux"
import { createTask } from "../actions/"
import { store } from "../store"

import Task from '../components/Task.component'
import { push } from "connected-react-router";

class renderProject extends Component {
	constructor(props) {
		super(props)

		this.project = props.projects.list.filter(
			project => project.uid === props.match.params.uid
		)[0]
	}

	componentWillMount(){
		if(!this.props.projects.length){
			// store.dispatch(push('/'))
		}
	}

	handleCreate() {
		store.dispatch(createTask(this.project.uid))
	}

	render() {
		const { tasks } = this.props
		return (
			<div>
				<button onClick={this.handleCreate.bind(this)}>Create</button>
				{tasks.list.length && 
					<div>
						{tasks.list
							.filter(task => task.project === this.project.uid)
							.map(task => {
								return <Task task={task} key={task.uid}/>
							})}
					</div>
				}
			</div>
		)
	}
}

const mapStateToProps = state => {
	return {
		projects: state.newProjects,
		tasks: state.newTasks,
		trackers: state.trackers
	}
}
const ProjectContainer = connect(mapStateToProps)(renderProject)
export default ProjectContainer
