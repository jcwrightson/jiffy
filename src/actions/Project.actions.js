import { uuidv4 } from "../lib/functions"
import { removeTask } from "./Task.actions";

export function createProject(title) {
	return (dispatch, getState) => {
		dispatch({
			type: "CREATE_PROJECT",
			payload: {
				uid: uuidv4(),
				created: Date.now(),
				title: title || "New Project",
				status: {
					active: true,
					completed: false,
					running: false
				}
			}
		})
	}
}


export function removeProject(uid) {
	return(dispatch, getState) => {
		const tasks = getState().tasks.list.filter(task => task.project === uid)

		tasks.map(task => {
			dispatch(removeTask(task.uid))
		})

		dispatch({type: "REMOVE_PROJECT", payload: uid})
	}
}