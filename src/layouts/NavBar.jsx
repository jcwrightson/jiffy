import React from "react"
import { NavLink, withRouter } from "react-router-dom"
import { connect } from "react-redux"

import { bindActionCreators } from "redux"
import * as actions from "../actions"

const renderNavBar = ({ toggleModal }) => {
	return (
		<nav className='fixed top'>
			<div className='container flex-row'>
				<div className='flex-row nav'>
					<NavLink to='/'>
						<h1 className='brand'>Jiffy</h1>
					</NavLink>

					<h1>|</h1>

					<NavLink to='/tasks' activeClassName='activeLink'>
						<h2>Tasks</h2>
					</NavLink>

					<NavLink to='/projects' activeClassName='activeLink'>
						<h2>Projects</h2>
					</NavLink>

					<NavLink to='/timesheets' activeClassName='activeLink'>
						<h2>Timesheets</h2>
					</NavLink>
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
						onClick={() => toggleModal("createProject")}>
						New Project
					</button>
					<button
						type='button'
						className='primary'
						onClick={() => toggleModal("createTask")}>
						New Task
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
