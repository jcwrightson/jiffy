import React from "react"

import ProjectsContainer from "../containers/Projects.container"
import AllTasksContainer from "../containers/AllTasks.container"
// import QueryProjects from "../components/QueryProjects.component"
// import QuickTask from "../components/QuickTask"

import Filter from "../components/Filter.component"

const Home = () => {
	return (
		<main>
			<div className='container'>
				{/* <QuickTask /> */}
				{/* <QueryProjects /> */}
			</div>

			{/* <ProjectsContainer includeArchived={false} /> */}
			{/* <Filter/> */}
			<AllTasksContainer />
			{/* <CombinedContainer /> */}
		</main>
	)
}

export default Home
