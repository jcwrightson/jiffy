import React from "react"
import { timeFilter, getAggregate } from "../lib/functions"
import SVG from "./SVG.component"
import icMore from "../assets/ic_more_vert_24px.svg"
import icUpdate from "../assets/ic_update_24px.svg"

const Task = ({
	uid,
	title,
	project,
	running,
	editing,
	completed,
	archived,
	projects,
	trackers,
	removeTask,
	handleEditTask,
	toggleEditTask,
	startTask,
	stopTask,
	archiveTask,
	toggleCompleted,
	selectProject
}) => {
	return (
		<article className={`task ${running ? "running" : ""}`}>
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
					<li>
						<button type='button' onClick={() => archiveTask(uid)}>
							{archived ? "Reinstate" : "Archive"}
						</button>
					</li>
				</ul>
			</div>

			<div className='flex-row title'>
				{archived ? (
					<h2>{title}</h2>
				) : (
					<>
						{editing ? (
							<React.Fragment>
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
							</React.Fragment>
						) : (
							<h2
								className='editable'
								title='Rename'
								onClick={e => {
									e.stopPropagation()
									toggleEditTask(e, uid)
								}}>
								{title}
							</h2>
						)}
					</>
				)}
			</div>

			<div className='flex-row controls'>
				{archived ? (
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
					{timeFilter(getAggregate(trackers, "time"))}
				</div>
				{!archived && (
					<button
						type='button'
						className='toggleRunning'
						onClick={() => (running ? stopTask(uid) : startTask(uid))}>
						{running ? "Stop" : "Start"}
					</button>
				)}
			</div>
		</article>
	)
}

export default Task
