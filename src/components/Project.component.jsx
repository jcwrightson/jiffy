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
			<p>{roundedTime(getAggregate(trackers, "time"))}</p>
			<p><Link to={`/projects/${uid}`}>View Tasks({tasks.length})</Link></p>
		</div>
	)
}

export default Project
