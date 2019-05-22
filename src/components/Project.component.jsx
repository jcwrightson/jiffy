import React, { Memo } from "react"
import { connect } from "react-redux"
import { withRouter, Link } from "react-router-dom"
import { timeFilter, roundedTime, getAggregate } from "../lib/functions"
import { store } from "../store"

import SVG from "./SVG.component"
import icMore from "../assets/ic_more_vert_24px.svg"

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
		<article className={`project ${hasRunningTask(tasks) ? "running" : ""}`}>
			<div className='flex-row title'>
				{editing ? (
					<React.Fragment>
						<input
							type='text'
							value={title}
							onChange={e => handleEditProject(e, uid)}
							onKeyDown={e => toggleEditProject(e, uid)}
							onClick={e => {
								e.target.select()
								e.stopPropagation()
							}}
						/>
						<button
							type='button'
							onClick={e => {
								if (editing) {
									toggleEditProject(e, uid)
								}
							}}>
							Cancel
						</button>
					</React.Fragment>
				) : (
					// eslint-disable-next-line jsx-a11y/no-noninteractive-element-interactions
					<h2
						type='button'
						className='editable'
						onClick={e => {
							e.stopPropagation()
							toggleEditProject(e, uid)
						}}>
						{title}
					</h2>
				)}
			</div>

			<div className='flex-row controls'>
				<div className='time flex-row'>
					{roundedTime(getAggregate(trackers, "time")) && (
						<SVG file={icUpdate} />
					)}
					{roundedTime(getAggregate(trackers, "time"))}
				</div>

				<Link to={`/projects/${uid}`}>
					<button type='button' className='secondary'>
						{tasks.length} Tasks
					</button>
				</Link>

				<div className='dots'>
					<SVG file={icMore} />
					<ul className='menu drop-shadow'>
						<li>
							<button
								type='button'
								title='Delete'
								onClick={() => {
									removeProject(uid)
								}}>
								Delete Project
							</button>
						</li>
					</ul>
				</div>
			</div>
		</article>
	)
}

export default Project
