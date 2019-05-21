import React, { Memo } from "react"
import { connect } from "react-redux"
import { withRouter, Link } from "react-router-dom"
import { timeFilter, roundedTime, getAggregate } from "../lib/functions"
import { store } from "../store"

const hasRunningTask = tasks => {
	return tasks.filter(task => task.running === true).length > 0
}

const Project = ({
	uid,
	editing,
	trackers,
	tasks,
	title,
	removeProject,
	createProject,
	handleEdit,
	toggleEdit,
	push
}) => {
	return (
		<div
			className={`project ${hasRunningTask(tasks) ? "running" : ""}`}
			onClick={e => {
				if (editing) {
					toggleEdit(e, uid)
				}
			}}>
			<div className='flex row justify-between'>
				{editing ? (
					<input
						type='text'
						value={title}
						onChange={e => handleEdit(e, uid)}
						onKeyDown={e => toggleEdit(e, uid)}
						onClick={e => {
							e.preventDefault
							e.target.select()
							e.stopPropagation()
						}}
					/>
				) : (
					<h2
						className='editable'
						onClick={e => {
							e.stopPropagation()
							toggleEdit(e, uid)
						}}>
						{title}
					</h2>
				)}

				<button
					className='svg delete'
					title='Delete'
					onClick={e => {
						e.stopPropagation()
						removeProject(uid)
					}}>
					<svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 14 14'>
						<path
							id='ic_clear_24px'
							d='M19,6.41,17.59,5,12,10.59,6.41,5,5,6.41,10.59,12,5,17.59,6.41,19,12,13.41,17.59,19,19,17.59,13.41,12Z'
							transform='translate(-5 -5)'
						/>
					</svg>
				</button>
			</div>
			<label className='aggregate svg'>
				{roundedTime(getAggregate(trackers, "time")) && (
					<svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 17.999 18'>
						<path
							id='ic_update_24px'
							d='M21,10.12H14.22L16.96,7.3a7.039,7.039,0,0,0-9.88-.1,6.875,6.875,0,0,0,0,9.79,7.02,7.02,0,0,0,9.88,0A6.513,6.513,0,0,0,19,12.1h2a9.341,9.341,0,0,1-2.64,6.29,9.054,9.054,0,0,1-12.72,0A8.84,8.84,0,0,1,5.62,5.81a8.987,8.987,0,0,1,12.65,0L21,3ZM12.5,8v4.25L16,14.33l-.72,1.21L11,13V8Z'
							transform='translate(-3.001 -3)'
						/>
					</svg>
				)}
				{roundedTime(getAggregate(trackers, "time"))}
			</label>
			<Link to={`/projects/${uid}`}>
				<button className='secondary'>{tasks.length} Tasks</button>
			</Link>
		</div>
	)
}

export default Project
