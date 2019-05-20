import React, { Component } from "react"
import Tracker from "./_Tracker.jsx/index.js"

import { timeFilter } from "../functions"

import { store } from "../store"

class Task extends Component {
	constructor(props) {
		super(props)

		this.state = {
			time: 0,
			style: {
				opacity: 0
			},
			minimised: true
		}

		this.start = this.start.bind(this)
		this.stop = this.stop.bind(this)
		this.midnight = false
	}

	start(task, tracker) {
		if (!tracker.running) {
			store.dispatch({
				type: "TOGGLE_RUNNING",
				payload: { task: task, tracker: tracker }
			})

			this.ticker = setInterval(() => {
				const time = new Date(Date.now())

				if (time.getHours() + time.getMinutes() === 0 && !this.midnight) {
					clearInterval(this.ticker)
					this.midnight = true

					setTimeout(() => {
						this.midnight = false
					}, 60000)

					store.dispatch({
						type: "TOGGLE_RUNNING",
						payload: { task: task, tracker: tracker }
					})

					tracker = Date.now()
					store.dispatch({
						type: "ADD_TRACKER",
						payload: { task: task, created: tracker }
					})
					this.start(task, tracker)
				} else {
					store.dispatch({
						type: "UPDATE_TRACKER",
						payload: {
							task: task,
							tracker: tracker,
							time: 1000
						}
					})
				}
			}, 1000)
		}
	}

	stop(task, tracker) {
		clearInterval(this.ticker)
		this.ticker = null

		store.dispatch({
			type: "TOGGLE_RUNNING",
			payload: { task: task, tracker: tracker }
		})
	}

	reset(task, tracker) {
		if (tracker.running) {
			this.stop(task, tracker)
		}

		store.dispatch({
			type: "RESET_TRACKER",
			payload: { task: task, tracker: tracker }
		})
	}

	toggleMinimised() {
		this.setState({
			minimised: !this.state.minimised
		})
	}

	transEnd() {
		console.log("ended")
	}

	handleRemove(uid) {
		if (this.ticker) {
			this.stop(uid)
		}

		if (this.task.uid === uid) {
			this.task.style["opacity"] = 0
		}

		setTimeout(() => {
			this.deletetask(uid)
		}, 400)

		// console.log(this.task.uid, created)
	}

	handleExport(task) {
		this.props.toggleModal("exportModal", {
			export: true,
			task: task
		})
	}

	deletetask(created) {
		store.dispatch({ type: "REMOVE_task", payload: created })
	}

	addTracker(task) {
		store.dispatch({ type: "ADD_TRACKER", payload: { task: task } })
	}

	toggleFullWidth(task) {
		store.dispatch({ type: "TOGGLE_FULL_WIDTH", payload: task })
	}

	filterBlank() {
		store.dispatch({ type: "FILTER_BLANK" })
	}

	togglePopup() {
		if (this.refs.taskMenu.classList.contains("js-active")) {
			this.refs.taskMenu.classList.remove("js-active")
		} else {
			this.refs.taskMenu.classList.add("js-active")
		}
	}

	componentDidMount() {
		const isToday = tracker => {
			const date = new Date(tracker.created)
			const today = new Date(Date.now())

			return (
				today.getDate() + today.getMonth() === date.getDate() + date.getMonth()
			)
		}

		if (
			this.props.task.trackers.filter(tracker => {
				return isToday(tracker)
			}).length === 0
		) {
			store.dispatch({
				type: "ADD_TRACKER",
				payload: { task: this.props.task.uid }
			})
		}
	}

	render() {
		setTimeout(() => {
			this.task.style["opacity"] = 1
		}, 200)

		const { task } = this.props

		const totalTime = task.trackers.reduce((total, tracker) => {
			return total + tracker.time
		}, 0)

		const roundedTime = () => {
			Math.round(totalTime)

			const date = new Date(totalTime)

			const days = date.getDate() - 1

			let hours = days * 24 + date.getHours() - 1

			let minutes = date.getMinutes()

			//   const seconds = date.getSeconds()

			if (minutes < 30 && minutes > 15) {
				minutes = 30
			} else {
				if (minutes > 30 && minutes < 45) {
					// hours++
					minutes = 45
				} else {
					if (minutes > 45) {
						hours++
						minutes = 0
					}
				}
			}
			if (minutes !== 0) {
				return `${hours}h ${minutes}min`
			} else {
				return `${hours}h`
			}
		}

		const trackerRunning = () => {
			if (
				task.trackers.filter(tracker => {
					return tracker.running === true
				}).length > 0
			) {
				return true
			}
		}

		const doStyle = () => {
			let style = {
				// opacity: 1,
			}
			if (task.fullWidth) {
				return {
					...style,
					flexBasis: "100%"
				}
			} else {
				return style
			}
		}

		return (
			<div
				className={`task ${trackerRunning() ? "running" : ""}`}
				style={doStyle()}
				id={task.uid}
				ref={e => {
					if (e) {
						this.task = e
					}
				}}>
				<div className='top flex row justify-between align-center'>
					<div>
						<h1>{task.title}</h1>
					</div>

					<ul className='flex row justify-end align-center'>
						<li>
							<i className={`material-icons schedule `}>schedule</i>
						</li>
						<li>
							<h2>
								{trackerRunning() ? timeFilter(totalTime) : roundedTime()}
							</h2>
						</li>
					</ul>
				</div>

				<div className='flex column'>
					{task.trackers.map((tracker, i) => {
						if (!this.state.minimised) {
							return (
								<Tracker
									key={i}
									index={i}
									task={task}
									tracker={tracker}
								/>
							)
						} else {
							if (i === task.trackers.length - 1) {
								return (
									<Tracker
										key={i}
										index={i}
										task={task}
										tracker={tracker}
									/>
								)
							}
						}
					})}
				</div>

				{task.trackers.length > 1 && (
					<div className='expand flex row justify-around'>
						{this.state.minimised ? (
							<i
								onClick={this.toggleMinimised.bind(this)}
								title='Expand'
								className='material-icons'>
								keyboard_arrow_down
							</i>
						) : (
							<i
								onClick={this.toggleMinimised.bind(this)}
								title='collapse'
								className='material-icons'>
								keyboard_arrow_up
							</i>
						)}
					</div>
				)}

				<div className=''>
					{/*<button onClick={()=>{this.addTracker(task.uid)}}><span><i className="material-icons button">add</i>Tracker</span></button>*/}

					{/*<span className="abs middle right" title={task.fullWidth ? 'Minimise' : 'Maximise'} onClick={()=>{this.toggleFullWidth(task)}}><i className="material-icons crop">{task.fullWidth ? 'crop_3_2' : 'crop_7_5'}</i></span>*/}
				</div>

				{/*<div className="circle" onClick={()=>{this.addTracker(task.uid)}}><i className="material-icons abs middle">add</i></div>*/}

				<ul className='bottom flex row justify-between align-center'>
					{!this.ticker ? (
						<li>
							<button
								title='Start Tracking'
								onClick={() => {
									this.start(
										task.uid,
										task.trackers[task.trackers.length - 1].created
									)
								}}>
								<i className='material-icons abs middle left'>play_arrow</i>
								<span>Start</span>
							</button>
						</li>
					) : (
						<li>
							<button
								title='Stop Tracking'
								className='running'
								onClick={() => {
									this.stop(
										task.uid,
										task.trackers[task.trackers.length - 1].created
									)
								}}>
								<i className='material-icons abs middle left'>stop</i>
								<span>Stop</span>
							</button>
						</li>
					)}

					<li onClick={this.togglePopup.bind(this)}>
						<i className='material-icons dots'>more_horiz</i>
					</li>
				</ul>

				<ul
					className='popup drop-shadow flex column'
					onMouseLeave={this.togglePopup.bind(this)}
					ref='taskMenu'>
					<li
						onClick={() => {
							this.handleRemove(task.uid)
						}}>{`Delete ${task.title}`}</li>
					<li
						onClick={() => {
							this.handleExport(task)
						}}>
						Export
					</li>
					<li>
						<hr />
					</li>
					<li
						onClick={() => {
							this.addTracker(task.uid)
						}}>
						Add Tracker
					</li>
					<li
						onClick={() => {
							this.filterBlank()
						}}>
						Filter Blank
					</li>
				</ul>
			</div>
		)
	}
}

export default Task
