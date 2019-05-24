import React from "react"

const CreateProject = ({
	title,
	project,
	projects,
	updateModalProps,
	toggleModal,
	createProject,
	createTask
}) => {
	return (
		<div
			role='presentation'
			className='dialogue test'
			onClick={e => e.stopPropagation()}>
			<header>Create Task</header>
			<main>
				<input
					type='text'
					value={title}
					placeholder='Name'
					onChange={e =>
						updateModalProps("createTask", { title: e.target.value })
					}
				/>
				<select
					value={project}
					onChange={e =>
						updateModalProps("createTask", { project: e.target.value })
					}
					title='Choose Project'>
					{projects.map(proj => {
						return (
							<option key={proj.uid} value={proj.uid}>
								{proj.title}
							</option>
						)
					})}
				</select>
			</main>
			<footer>
				<button onClick={() => toggleModal("createTask")} type='button'>
					Cancel
				</button>
				<button
					className='primary'
					type='submit'
					onClick={() => {
						createTask(project || projects[0].uid, title)
						toggleModal("createTask")
					}}>
					Save
				</button>
			</footer>
		</div>
	)
}

export default CreateProject
