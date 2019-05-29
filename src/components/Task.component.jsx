import React from "react"
import { timeFilter, getAggregate } from "../lib/functions"
import SVG from "./SVG.component"
import icMore from "../assets/ic_more_vert_24px.svg"
import icUpdate from "../assets/ic_update_24px.svg"
import icDone from "../assets/ic_done_24px.svg"
import icPlay from "../assets/ic_play_arrow_24px.svg"
import icStop from "../assets/ic_stop_24px.svg"

const Task = ({
	uid,
	title,
	project,
	running,
	editing,
	completed,
	projects,
	trackers,
	removeTask,
	handleEditTask,
	toggleEditTask,
	startTask,
	stopTask,
	toggleCompleted,
	selectProject
}) => {
	return (
		<article
			className={`task ${completed ? "completed" : ""} ${
				running ? "running" : ""
			}`}>
			<div className='flex-row dots'>
				<SVG file={icMore} />
				<ul className='menu drop-shadow'>
					<li>
						<button type='button' onClick={() => toggleCompleted(uid)}>
							{completed ? "Mark ToDo" : "Mark Completed"}
						</button>
					</li>
					<li>
						<button
							type='button'
							onClick={() => {
								/* eslint-disable */
								if (confirm("Delete task?")) {
									removeTask(uid)
								}
								/* eslint-enable */
							}}>
							Delete Task
						</button>
					</li>
				</ul>
			</div>

			{completed ? (
				<div className='flex-row title'>
					<h2>{title}</h2>
					{/* <SVG file={icDone} /> */}
				</div>
			) : (
				<>
					{editing ? (
						<div className='flex-row title'>
							<input
								type='text'
								value={title}
								onChange={e => handleEditTask(e, uid)}
								onKeyDown={e => toggleEditTask(e, uid)}
							/>
							<button
								type='button'
								onClick={e => {
									if (editing) {
										toggleEditTask(e, uid)
									}
								}}>
								Cancel
							</button>
						</div>
					) : (
						<div className='flex-row title'>
							<h2
								className='editable'
								title='Rename'
								onClick={e => {
									e.stopPropagation()
									toggleEditTask(e, uid)
								}}>
								{title}
							</h2>
						</div>
					)}
				</>
			)}

			<div className='flex-row controls'>
				{completed ? (
					<label>
						{projects.filter(proj => proj.uid === project)[0].title}
					</label>
				) : (
					<select
						value={project}
						onChange={e => selectProject(e, uid)}
						title='In Project'>
						{projects.map(proj => {
							return (
								<option key={proj.uid} value={proj.uid}>
									{proj.title}
								</option>
							)
						})}
					</select>
				)}
				<div className='time flex-row'>
					<SVG file={icUpdate} />
					<span className='ticker'>
						{timeFilter(getAggregate(trackers, "time"))}
					</span>
				</div>
				{!completed && (
					<button
						type='button'
						className='toggleRunning'
						onClick={() => (running ? stopTask(uid) : startTask(uid))}>
						{running ? <SVG file={icStop} /> : <SVG file={icPlay} />}
					</button>
				)}
			</div>
		</article>
	)
}

export default Task
