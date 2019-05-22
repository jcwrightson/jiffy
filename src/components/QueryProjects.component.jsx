import React from "react"
import { connect } from "react-redux"

const renderQueryProjects = ({ projects }) => {
	return (
		<div>
			<input type='text' />
			<select>
				{projects.map(project => {
					return (
						<option value={project.uid} key={project.uid}>
							{project.title}
						</option>
					)
				})}
			</select>
		</div>
	)
}

const mapStateToProps = state => {
	return {
		projects: state.projects.list
	}
}

const mapDispatchToProps = dispatch => {
	return{
		handleQuery: e =>{

		}
	}
}


const QueryProjects = connect(mapStateToProps, mapDispatchToProps)(renderQueryProjects)
export default QueryProjects
