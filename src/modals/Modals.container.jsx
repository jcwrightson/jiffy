import React from "react"
import { connect } from "react-redux"
import { bindActionCreators } from "redux"
import * as actions from "../actions"

import CreateProject from "./CreateProject.modal"
import CreateTask from "./CreateTask.modal"

const renderModals = ({
	modals,
	projects,
	toggleModal,
	updateModalProps,
	createProject,
	createTask
}) => {
	return (
		<div>
			{modals.createProject.active && (
				<div
					className='modal'
					onClick={() => toggleModal("createProject")}
					role='presentation'>
					<CreateProject
						{...modals.createProject.props}
						toggleModal={toggleModal}
						updateModalProps={updateModalProps}
						createProject={createProject}
					/>
				</div>
			)}

			{modals.createTask.active && (
				<div
					className='modal'
					onClick={() => toggleModal("createTask")}
					role='presentation'>
					<CreateTask
						{...modals.createTask.props}
						toggleModal={toggleModal}
						updateModalProps={updateModalProps}
						createProject={createProject}
						createTask={createTask}
						projects={projects}
					/>
				</div>
			)}
		</div>
	)
}
const mapStateToProps = state => {
	return {
		modals: state.modals,
		projects: state.projects.list
	}
}

const mapDispatchToProps = dispatch => {
	return {
		...bindActionCreators(actions, dispatch)
	}
}

const Modals = connect(
	mapStateToProps,
	mapDispatchToProps
)(renderModals)
export default Modals
