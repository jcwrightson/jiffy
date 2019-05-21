import React from "react"
import { Link, withRouter} from "react-router-dom"
import { connect } from "react-redux"
import { createProject, createTask } from "../actions"

const renderNavBar = ({ createProject, createTask, location, history }) => {
	console.log(location.pathname.replace('/projects/', ''))
	return (
		<nav>
			<div className='container flex row justify-between align-center'>
				<Link to={"/"}><h1>Time Tracking</h1></Link>

				<div className='top-nav flex row justify-end'>
					<button
						className=''
						onClick={() => {
							// this.handleImport()
						}}>
						Import
					</button>
					<button
						className='add'
						onClick={() => {
							{location.pathname === '/' ? createProject() : createTask(location.pathname.replace('/projects/', ''))}
						}}>
						{location.pathname === '/' ? 'New Project' : 'New Task'}
					</button>
				</div>
			</div>
		</nav>
	)
}

const mapDispatchToProps = dispatch => {
	return {
		createProject: () => {
			dispatch(createProject())
		},
		createTask: (uid) => {
			dispatch(createTask(uid))
		}
	}
}

const NavBar = withRouter(connect(
	null,
	mapDispatchToProps
)(renderNavBar))

export default NavBar
