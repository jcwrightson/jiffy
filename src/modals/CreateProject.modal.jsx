import React from "react"

const CreateProject = ({
	title,
	updateModalProps,
	toggleModal,
	createProject
}) => {
	return (
		<div
			role='presentation'
			className='dialogue test'
			onClick={e => e.stopPropagation()}>
			<header>Create Project</header>
			<main>
				<input
					type='text'
					value={title}
					placeholder='Name'
					onChange={e =>
						updateModalProps("createProject", { title: e.target.value })
					}
				/>
			</main>
			<footer>
				<button onClick={() => toggleModal("createProject")} type='button'>
					Cancel
				</button>
				<button
					className='primary'
					type='submit'
					onClick={() => {
						createProject(title)
						toggleModal("createProject")
					}}>
					Save
				</button>
			</footer>
		</div>
	)
}

export default CreateProject
