import { uuidv4 } from "../lib/functions"

export function createTracker(projectUID, taskUID) {
	return dispatch => {
		dispatch({
			type: "CREATE_TRACKER",
			payload: {
				uid: uuidv4(),
				project: projectUID,
				task: taskUID,
				created: Date.now(),
				time: 0,
				running: false
			}
		})
	}
}

export function removeTracker(uid) {
	return dispatch => {
		dispatch({ type: "REMOVE_TRACKER", payload: uid })
	}
}

export function updateTracker(uid, time) {
	return dispatch => {
		dispatch({ type: "UPDATE_TRACKER", payload: { uid, time } })
	}
}

export function startTracker(uid) {
	return dispatch => {

		const interval = setInterval(() => {
			dispatch(updateTracker(uid, 1000))
		}, 1000)

		dispatch({ type: "START_TRACKER", payload: { interval, uid } })
	}
}

export function stopTracker(uid) {
	return (dispatch, getState) => {

		const { interval } = getState().trackers.list.filter(
			tracker => tracker.uid === uid
		)[0]

		clearInterval(interval)

		dispatch({ type: "STOP_TRACKER", payload: { uid } })
	}
}
