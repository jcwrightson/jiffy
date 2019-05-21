import { uuidv4 } from "../lib/functions"

export function createTracker(projectUID, taskUID) {

	return (dispatch) => {
		
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

export function removeTracker(uid){
	return (dispatch) => {
		dispatch({type:'REMOVE_TRACKER', payload: uid})
	}
}
