import React from "react"
import { Link } from "react-router-dom"
import { timeFilter, roundedTime, getAggregate } from "../lib/functions"

import SVG from "./SVG.component"
import icMore from "../assets/ic_more_vert_24px.svg"
import icUpdate from "../assets/ic_update_24px.svg"

const Project = ({
	uid,
	editing,
	trackers,
	tasks,
	title,
	removeProject,
	handleEditProject,
	toggleEditProject,
	toggleArchiveProject
}) => {
	const hasRunningTask = () => {
		return tasks.filter(task => task.running).length > 0
	}

	return (
		<article className={`project ${hasRunningTask() ? "running" : ""}`}>
			<div className='flex-row dots'>
				<SVG file={icMore} />
				<ul className='menu drop-shadow'>
					<li>
						<button
							type='button'
							onClick={() => {
								/* eslint-disable */
								if (confirm("Delete this project and all associated tasks?")) {
									removeProject(uid)
								}
								/* eslint-enable */
							}}>
							Delete Project
						</button>
					</li>
					<li>
						<button type='button' onClick={() => toggleArchiveProject(uid)}>
							Archive Project
						</button>
					</li>
				</ul>
			</div>
			<div className='flex-row title'>
				{editing ? (
					<>
						<input
							type='text'
							value={title}
							onChange={e => handleEditProject(e, uid)}
							onKeyDown={e => toggleEditProject(e, uid)}
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
					</>
				) : (
					// eslint-disable-next-line jsx-a11y/no-noninteractive-element-interactions
					<h2
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
				{hasRunningTask() ? (
					<div className='time flex-row'>
						<SVG file={icUpdate} />
						{timeFilter(getAggregate(trackers, "time"))}
					</div>
				) : (
					<div className='time flex-row'>
						<SVG file={icUpdate} />
						{roundedTime(getAggregate(trackers, "time")) ||
							timeFilter(getAggregate(trackers, "time"))}
					</div>
				)}

				<Link to={`/projects/${uid}`}>
					<button type='button'>{tasks.length} Tasks</button>
				</Link>
			</div>
		</article>
	)
}

export default Project
