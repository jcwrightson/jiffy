export * from "./Project.actions"
export * from "./Task.actions"
export * from "./Tracker.actions"

export function toggleEdit(e, uid) {
	return dispatch => {
		if (e.key === "Enter" || e.type === "click") {
			dispatch({
				type: "TOGGLE_EDIT",
				payload: uid
			})
		}
	}
}

export function toggleRunning(taskUID, trackerUID) {
	return dispatch => {
		dispatch({
			type: "TOGGLE_RUNNING",
			payload: { task: taskUID, tracker: trackerUID }
		})
	}
}
