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
					title: title || "Unamed Task",
					blurb: blurb || "",
					time: 0,
					started: null,
					running: false,
					editing: !title,
					archived: false,
					completed: false
				}
			})
			dispatch(createTracker(taskUID, projectUID))
		} else {
			throw new Error("Invalid Project UID")
		}
	}
}

export function startTask(uid) {
	return (dispatch, getState) => {
		dispatch({
			type: "START_TASK",
			payload: uid
		})

		const tracker = getState().trackers.list.filter(tr => tr.task === uid)[0]
			.uid

		if (tracker) {
			dispatch(startTracker(tracker))
		}
	}
}

export function stopTask(uid) {
	return (dispatch, getState) => {
		dispatch({
			type: "STOP_TASK",
			payload: uid
		})

		const tracker = getState().trackers.list.filter(tr => tr.task === uid)[0]
			.uid

		if (tracker) {
			dispatch(stopTracker(tracker))
		}
	}
}

export function removeTask(uid) {
	return (dispatch, getState) => {
		getState()
			.trackers.list.filter(tracker => tracker.task === uid)
			.map(tracker => {
				return dispatch({ type: "REMOVE_TRACKER", payload: tracker.uid })
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
			payload: { uid, body: { title: e.target.value } }
		})
	}
}

export function archiveTask(uid) {
	return dispatch => {
		dispatch({
			type: "TOGGLE_ARCHIVE_TASK",
			payload: uid
		})
	}
}

export function toggleMenu(uid) {
	return dispatch => {
		dispatch({
			type: "TOGGLE_MENU",
			payload: uid
		})
	}
}

export function toggleCompleted(uid) {
	return dispatch => {
		dispatch({
			type: "TOGGLE_COMPLETED_TASK",
			payload: uid
		})
	}
}

export function selectProject(e, uid) {
	return (dispatch, getState) => {
		dispatch({
			type: "SELECT_PROJECT",
			payload: {
				uid,
				project: e.target.value
			}
		})

		getState()
			.trackers.list.filter(tracker => tracker.task === uid)
			.map(tracker => {
				return dispatch({
					type: "SELECT_TRACKER_PROJECT",
					payload: {
						uid: tracker.uid,
						project: e.target.value
					}
				})
			})
	}
}

export function toggleShowArchived() {
	return dispatch => {
		dispatch({
			type: "TOGGLE_SHOW_ARCHIVED"
		})
	}
}

export function selectFilterByProject(uid) {
	return dispatch => {
		dispatch({
			type: "FILTER_PROJECT",
			payload: uid
		})
	}
}
