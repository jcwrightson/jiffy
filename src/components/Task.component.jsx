import React from "react"
import { timeFilter, getAggregate } from "../lib/functions"
import SVG from "./SVG.component"
import icMore from "../assets/ic_more_vert_24px.svg"
import icUpdate from "../assets/ic_update_24px.svg"

const Task = ({
	uid,
	title,
	running,
	editing,
	trackers,
	removeTask,
	handleEditTask,
	toggleEditTask,
	startTask,
	stopTask,
	archiveTask
}) => {
	return (
		<article className={`task ${running ? "running" : ""}`}>
			<div className='flex-row title'>
				{editing ? (
					<React.Fragment>
						<input
							type='text'
							value={title}
							onChange={e => handleEditTask(e, uid)}
							onKeyDown={e => toggleEditTask(e, uid)}
							onClick={e => {
								e.target.select()
								e.stopPropagation()
							}}
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
					// eslint-disable-next-line jsx-a11y/no-noninteractive-element-interactions
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
			</div>

			<div className='flex-row controls'>
				<div className='time flex-row'>
					<SVG file={icUpdate} />
					{timeFilter(getAggregate(trackers, "time"))}
				</div>

				<button
					type='button'
					className='toggleRunning'
					onClick={() => (running ? stopTask(uid) : startTask(uid))}>
					{running ? "Stop" : "Start"}
				</button>

				<div className='dots'>
					<SVG file={icMore} />
					<ul className='menu drop-shadow'>
						<li>
							<button
								type='button'
								title='Delete'
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
								Archive
							</button>
						</li>
					</ul>
				</div>
			</div>
		</article>
	)
}

export default Task
