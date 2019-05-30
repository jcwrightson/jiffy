import React from "react"
import Task from "../components/Task.component"

const TasksContainer = props => {
	return (
		<div className='tasks container list'>
			{props.tasks.map(task => {
				return (
					<Task
						{...task}
						{...props}
						trackers={props.trackers.filter(tr => tr.task === task.uid)}
						tasks={props.tasks}
						key={task.uid}
					/>
				)
			})}
		</div>
	)
}

export default TasksContainer
