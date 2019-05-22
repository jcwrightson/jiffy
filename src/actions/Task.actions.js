import { uuidv4 } from "../lib/functions"
import { createTracker, startTracker, stopTracker } from "./Tracker.actions"

const isValidProjectUID = (UID, projects) => {
	return projects.filter(project => project.uid === UID).length === 1
}

export function createTask(projectUID, title, blurb, uid) {
	return (dispatch, getState) => {
		if (isValidProjectUID(projectUID, getState().projects.list)) {
			const taskUID = uid || uuidv4()
			dispatch({
				type: "CREATE_TASK",
				payload: {
					uid: taskUID,
					project: projectUID,
					created: Date.now(),
					title: title || "New Task",
					blurb: blurb || "",
					time: 0,
					started: null,
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
	return (dispatch, getState) => {
		const trackers = getState().trackers.list.filter(
			tracker => tracker.task === uid
		)

		trackers.map(tracker => {
			if (tracker.running) {
				clearInterval(window.__tracker__[tracker.uid].tick)
			}
			dispatch({ type: "REMOVE_TRACKER", payload: tracker.uid })
		})

		dispatch({ type: "REMOVE_TASK", payload: uid })
	}
}

export function toggleEditTask(e, uid) {
	return dispatch => {
		if (e.key === "Enter" || e.type === "click") {
			dispatch({
				type: "TOGGLE_EDIT_TASK",
				payload: uid
			})
		}
	}
}

export function handleEditTask(e, uid) {
	return dispatch => {
		dispatch({
			type: "EDIT_TASK",
			payload: { uid: uid, body: { title: e.target.value } }
		})
	}
}

export function startTask(uid) {
	return (dispatch, getState) => {
		dispatch({
			type: "START_TASK",
			payload: uid
		})

		const tracker = getState().trackers.list.filter(tracker => tracker.task === uid)[0].uid

		if(tracker){
			dispatch(startTracker(tracker))
		}
	}
}

export function stopTask(uid){
	return (dispatch, getState)=>{
		dispatch({
			type: "STOP_TASK",
			payload: uid
		})

		const tracker = getState().trackers.list.filter(tracker => tracker.task === uid)[0].uid

		if(tracker){
			dispatch(stopTracker(tracker))
		}
	}
}
