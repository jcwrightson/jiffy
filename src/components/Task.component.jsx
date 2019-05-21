import React, { Component } from "react"
import Tracker from "./Tracker.component"
import { timeFilter } from "../lib/functions"
import { store } from "../store"
import { connect } from "react-redux"

const Task = ({
	task,
	trackers,
	createTracker,
	createTask,
	removeTask,
	handleEdit,
	toggleEdit,
	toggleRunning
}) => {
	return (
		<article
			className={`task ${task.running ? "running" : ""}`}
			onClick={e => {
				if (task.editing) {
					toggleEdit(e, task.uid)
				}
			}}>
			<div className='flex row justify-between'>
				{task.editing ? (
					<input
						type='text'
						value={task.title}
						onChange={e => handleEdit(e, task.uid)}
						onKeyDown={e => toggleEdit(e, task.uid)}
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
							toggleEdit(e, task.uid)
						}}>
						{task.title}
					</h2>
				)}
				<button
					className='svg delete'
					title='Delete'
					onClick={() => {
						removeTask(task.uid)
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

			<div className='trackers'>
				{trackers.map(tracker => {
					return <Tracker tracker={tracker} task={task} key={tracker.uid} />
				})}
			</div>
			<div>
				<button
					className='secondary'
					onClick={() => {
						toggleRunning(task.uid, trackers[0].uid)
					}}>
					{task.running ? "Stop" : "Start"}
				</button>
				{/* <button onClick={()=>createTracker(task.project, task.uid)}>Add Tracker</button> */}
			</div>
		</article>
	)
}

export default Task
