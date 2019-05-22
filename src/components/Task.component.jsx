import React from "react"
import { timeFilter, getAggregate } from "../lib/functions"
import SVG from "./SVG.component"
import icMore from "../assets/ic_more_vert_24px.svg"
import icUpdate from "../assets/ic_update_24px.svg"

const Task = ({
	task,
	trackers,
	removeTask,
	handleEditTask,
	toggleEditTask,
	startTask,
	stopTask
}) => {
	return (
		<article className={`task ${task.running ? "running" : ""}`}>
			<div className='flex-row title'>
				{task.editing ? (
					<React.Fragment>
						<input
							type='text'
							value={task.title}
							onChange={e => handleEditTask(e, task.uid)}
							onKeyDown={e => toggleEditTask(e, task.uid)}
							onClick={e => {
								e.target.select()
								e.stopPropagation()
							}}
						/>
						<button
							type='button'
							onClick={e => {
								if (task.editing) {
									toggleEditTask(e, task.uid)
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
							toggleEditTask(e, task.uid)
						}}>
						{task.title}
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
					onClick={() =>
						task.running ? stopTask(task.uid) : startTask(task.uid)
					}>
					{task.running ? "Stop" : "Start"}
				</button>

				<div className='dots'>
					<SVG file={icMore} />
					<ul className='menu drop-shadow'>
						<li>
							<button
								type='button'
								title='Delete'
								onClick={() => {
									removeTask(task.uid)
								}}>
								Delete Task
							</button>
						</li>
					</ul>
				</div>
			</div>
		</article>
	)
}

export default Task
