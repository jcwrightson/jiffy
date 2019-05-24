import React from "react"

import ProjectsContainer from "../containers/Projects.container"

const Projects = () => {
	return (
		<main>
			<ProjectsContainer includeArchived={false} />
		</main>
	)
}

export default Projects
