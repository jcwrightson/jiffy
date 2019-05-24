import { uuidv4 } from "../lib/functions"

export function createTracker(taskUID) {
	return dispatch => {
		dispatch({
			type: "CREATE_TRACKER",
			payload: {
				uid: uuidv4(),

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

export function updateTrackerTime(uid, time) {
	return dispatch => {
		dispatch({ type: "UPDATE_TRACKER_TIME", payload: { uid, time } })
	}
}

export function startTracker(uid) {
	return dispatch => {
		const interval = setInterval(() => {
			dispatch(updateTrackerTime(uid, 1000))
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
