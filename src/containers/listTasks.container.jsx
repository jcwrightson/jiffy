import React from "react"
import { connect } from "react-redux"

const listTasks = ({ project, tasks }) => {
	return <div>{tasks.length}</div>
}

const mapStateToProps = state => {
	return {
		tasks: state.newTasks.list.filter(task => task.project === project)
	}
}

const ListTasks = connect(mapStateToProps)(listTasks)
export default ListTasks
