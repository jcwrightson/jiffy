import React from "react"
import { connect } from "react-redux"

import { bindActionCreators } from "redux"
import * as actions from "../actions/"

const renderQueryProjects = ({
	projects,
	query,
	queryProjects,
	createProject
}) => {

	const results = projects.filter(project =>
		project.title.toLowerCase().includes(query)
	)

	const handleResult = e =>{
		queryProjects(e.target.value)

		
		if(e.key === "Enter"){
			if(results.length === 1){
				console.log(results[0])
			}
			if(results.length === 0){
				createProject(e.target.value)
			}
		}else{
			
		}
	}

	return (
		<div>
			<input type='text' value={query} onChange={handleResult}/>
			<select >
				{results
					.map(project => {
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
		projects: state.projects.list,
		query: state.projects.query
	}
}

const mapDispatchToProps = dispatch => {
	return {
		...bindActionCreators(actions, dispatch)
	}
}

const QueryProjects = connect(
	mapStateToProps,
	mapDispatchToProps
)(renderQueryProjects)
export default QueryProjects
