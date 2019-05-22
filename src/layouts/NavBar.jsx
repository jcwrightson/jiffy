import React from "react"
import { Link, withRouter} from "react-router-dom"
import { connect } from "react-redux"
import { createProject, createTask } from "../actions"

const renderNavBar = ({ createProject, createTask, location, history }) => {
	return (
		<nav className="fixed top drop-shadow">
			<div className='container flex-row'>
				<Link to={"/"}><h1>Jiffy</h1></Link>

				<div className='top-nav flex-row '>
					<button
						disabled
						className=''
						onClick={() => {
							// this.handleImport()
						}}>
						Import
					</button>
					<button
						className='primary'
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
