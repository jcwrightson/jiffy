export * from "./Project.actions"
export * from "./Task.actions"
export * from "./Tracker.actions"



export function toggleRunning(taskUID, trackerUID) {
	return dispatch => {
		dispatch({
			type: "TOGGLE_RUNNING",
			payload: { task: taskUID, tracker: trackerUID }
		})
	}
}
