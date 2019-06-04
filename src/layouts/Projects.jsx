import React from "react"
import NavBar from "./NavBar"
import ProjectsContainer from "../containers/Projects.container"

const Projects = props => {
	return (
		<>
			<NavBar />
			<main>
				<ProjectsContainer {...props} />
			</main>
		</>
	)
}

export default Projects
