/* eslint-disable jsx-a11y/label-has-associated-control */
/* eslint-disable jsx-a11y/label-has-for */
import React from "react"

const Filter = ({
	projects,
	showCompleted,
	filterByProject,
	selectFilterByProject,
	toggleShowCompleted
}) => {
	return (
		<div className='filters container'>
			<div className='filter flex-row'>
				<label>
					<span>Project: </span>
					<select
						value={filterByProject}
						title='In Project'
						onChange={e => selectFilterByProject(e.target.value)}>
						<option value='all'>Any Project</option>
						{projects.map(proj => {
							return (
								<option key={proj.uid} value={proj.uid}>
									{proj.title}
								</option>
							)
						})}
					</select>
				</label>

				<label>
					<input
						type='checkbox'
						checked={showCompleted}
						// onChange={toggleShowArchived}
						onChange={toggleShowCompleted}
					/>
					<span>Show Completed</span>
				</label>
			</div>
		</div>
	)
}

export default Filter
