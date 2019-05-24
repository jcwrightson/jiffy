import React from "react"

import ProjectsContainer from "../containers/Projects.container"
import AllTasksContainer from "../containers/AllTasks.container"
// import QueryProjects from "../components/QueryProjects.component"
// import QuickTask from "../components/QuickTask"

const Home = () => {
	return (
		<main>
			<div className='container'>
				{/* <QuickTask /> */}
				{/* <QueryProjects /> */}
			</div>

			{/* <ProjectsContainer includeArchived={false} /> */}
			<AllTasksContainer />
			{/* <CombinedContainer /> */}
		</main>
	)
}

export default Home
