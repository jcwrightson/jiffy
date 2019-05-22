import React from "react"

import QueryProjects from "../components/QueryProjects.component"
import ProjectsContainer from "../containers/Projects.container"
import QuickTask from "../components/QuickTask"

const Home = () => {
	return (
		<main>
			<div className='container'>
				<QuickTask />
				<QueryProjects />
			</div>

			<ProjectsContainer />
		</main>
	)
}

export default Home
