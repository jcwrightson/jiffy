import { uuidv4 } from "../lib/functions"

export function createTracker(projectUID, taskUID) {

	return (dispatch, getState) => {
		
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
