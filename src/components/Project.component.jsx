import React, { Memo } from "react"
import { connect } from "react-redux"
import { withRouter, Link } from "react-router-dom"
import { timeFilter, roundedTime, getAggregate } from "../lib/functions"
import { store } from "../store"

import SVG from "./SVG.component"

import icUpdate from "../assets/ic_update_24px.svg"
import icClear from "../assets/ic_clear_24px.svg"

const Project = ({
	uid,
	editing,
	trackers,
	tasks,
	title,
	removeProject,
	createProject,
	handleEditProject,
	toggleEditProject,
	push
}) => {
	const hasRunningTask = tasks => {
		return tasks.filter(task => task.running === true).length > 0
	}

	return (
		<div
			className={`project ${hasRunningTask(tasks) ? "running" : ""}`}
			onClick={e => {
				if (editing) {
					toggleEditProject(e, uid)
				}
			}}>
			<div className='flex row justify-between'>
				{editing ? (
					<input
						type='text'
						value={title}
						onChange={e => handleEditProject(e, uid)}
						onKeyDown={e => toggleEditProject(e, uid)}
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
							toggleEditProject(e, uid)
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
					<SVG path={icClear} />
				</button>
			</div>
			<label className='aggregate svg'>
				{roundedTime(getAggregate(trackers, "time")) && <SVG path={icUpdate} />}
				{roundedTime(getAggregate(trackers, "time"))}
			</label>
			<Link to={`/projects/${uid}`}>
				<button className='secondary'>{tasks.length} Tasks</button>
			</Link>
		</div>
	)
}

export default Project
