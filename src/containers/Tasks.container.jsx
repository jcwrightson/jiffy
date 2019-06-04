import React from "react"
import Task from "../components/Task.component"
import Filter from "../components/Filter.component"

const TasksContainer = props => {
	return (
		<div className='tasks container tabbed'>
			<div className='flex-row control'>
				<div className='flex-row tab-select'>
					<button
						onClick={() => props.selectActiveTab(0)}
						type='button'
						className={`${props.activeTab === 0 ? "js-active" : ""}`}>
						ToDo ({props.tasks.filter(task => !task.completed).length})
					</button>
					<button
						onClick={() => props.selectActiveTab(1)}
						type='button'
						className={`${props.activeTab === 1 ? "js-active" : ""}`}>
						Completed ({props.tasks.filter(task => task.completed).length})
					</button>
				</div>
				<div className='flex-row filters'>
					<Filter {...props} />
				</div>
			</div>
			<div className={`tab todo ${props.activeTab === 0 ? "js-active" : ""}`}>
				<div className='list'>
					{props.tasks
						.filter(task => !task.completed)
						.map(task => {
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
			</div>
			<div className={`tab todo ${props.activeTab === 1 ? "js-active" : ""}`}>
				<div className='list'>
					{props.tasks
						.filter(task => task.completed)
						.map(task => {
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
			</div>
		</div>
	)
}

export default TasksContainer
