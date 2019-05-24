import { uuidv4 } from "../lib/functions"
import { removeTask } from "./Task.actions"

export function createProject(title, uid) {
	return dispatch => {
		dispatch({
			type: "CREATE_PROJECT",
			payload: {
				uid: uid || uuidv4(),
				created: Date.now(),
				title: title || "Unamed Project",
				editing: !title,
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
	return (dispatch, getState) => {
		const tasks = getState().tasks.list.filter(task => task.project === uid)

		tasks.map(task => {
			dispatch(removeTask(task.uid))
		})

		dispatch({ type: "REMOVE_PROJECT", payload: uid })
	}
}

export function toggleEditProject(e, uid) {
	return dispatch => {
		if (e.key === "Enter" || e.type === "click") {
			dispatch({
				type: "TOGGLE_EDIT_PROJECT",
				payload: uid
			})
		}
	}
}

export function handleEditProject(e, uid) {
	return dispatch => {
		dispatch({
			type: "EDIT_PROJECT",
			payload: { uid, body: { title: e.target.value } }
		})
	}
}

export function queryProjects(value) {
	return dispatch => {
		dispatch({
			type: "QUERY_PROJECTS",
			payload: value
		})
	}
}
