import { uuidv4 } from "../lib/functions"
import { createTracker } from './Tracker.actions'

const isValidProjectUID = (UID, projects) => {
	return projects.filter(project => project.uid === UID).length === 1
}

export function createTask(projectUID, title, blurb) {

	return (dispatch, getState) => {
		if (isValidProjectUID(projectUID, getState().projects.list)) {
			const taskUID = uuidv4()
			dispatch({
				type: "CREATE_TASK",
				payload: {
					uid: taskUID,
					project: projectUID,
					created: Date.now(),
					title: title || 'New Task',
					blurb: blurb || '',
					time: 0,
					running: false,
					editing: false
				}
			})
			dispatch(createTracker(projectUID, taskUID))
		} else {
			throw new Error("Invalid Project UID")
		}
	}
}

export function removeTask(uid) {
	return(dispatch, getState) => {
		const trackers = getState().trackers.list.filter(tracker => tracker.task === uid)

		trackers.map(tracker => {
			if(tracker.running){
				clearInterval(window.__tracker__[tracker.uid].tick)
			}
			dispatch({type: "REMOVE_TRACKER", payload: tracker.uid})
		})

		dispatch({type: "REMOVE_TASK", payload: uid})
	}
}
