/* eslint-disable jsx-a11y/label-has-associated-control */
/* eslint-disable jsx-a11y/label-has-for */
import React from "react"

const Filter = ({
	projects,
	showArchived,
	filterByProject,
	selectFilterByProject,
	toggleShowArchived
}) => {
	return (
		<div className='filters flex-row'>
			<div className='flex-row'>
				<h1>Filter</h1>
			</div>
			<div className='flex-row controls'>
				<label>
					<span>Project: </span>
					<select
						value={filterByProject}
						title='In Project'
						onChange={e => selectFilterByProject(e.target.value)}>
						<option value='all'>All Projects</option>
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
						checked={showArchived}
						onChange={toggleShowArchived}
					/>
					<span>Show Completed</span>
				</label>
			</div>
		</div>
	)
}

export default Filter
