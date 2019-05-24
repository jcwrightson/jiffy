import React from "react"
import { Link, withRouter } from "react-router-dom"
import { connect } from "react-redux"

import { bindActionCreators } from "redux"
import * as actions from "../actions"

const renderNavBar = ({ createProject, createTask, location }) => {
	return (
		<nav className='fixed top drop-shadow'>
			<div className='container flex-row'>
				<div className='flex-row nav'>
					<Link to='/'>
						<h1>Jiffy</h1>
					</Link>

					<h1>|</h1>

					<Link to='/'>
						<h2>Projects</h2>
					</Link>

					<Link to='/tasks'>
						<h2>Tasks</h2>
					</Link>
				</div>

				<div className='top-nav flex-row '>
					<button
						type='button'
						disabled
						className=''
						onClick={() => {
							// this.handleImport()
						}}>
						Import
					</button>
					<button
						type='button'
						className='primary'
						onClick={() =>
							location.pathname === "/"
								? createProject()
								: createTask(location.pathname.replace("/projects/", ""))
						}>
						{location.pathname === "/" ? "New Project" : "New Task"}
					</button>
				</div>
			</div>
		</nav>
	)
}

const mapDispatchToProps = dispatch => {
	return {
		...bindActionCreators(actions, dispatch)
	}
}

const NavBar = withRouter(
	connect(
		null,
		mapDispatchToProps
	)(renderNavBar)
)

export default NavBar
