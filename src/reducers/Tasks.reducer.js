export function tasks(
	state = {
		list: []
	},
	action
) {
	switch (action.type) {
		case "LOAD_TASKS":
			return Object.assign({}, state, {
				list: [...action.payload]
			})
		case "CREATE_TASK":
			return Object.assign({}, state, {
				list: [action.payload, ...state.list]
			})
		case "REMOVE_TASK":
			return Object.assign({}, state, {
				list: [...state.list.filter(task => task.uid !== action.payload)]
			})
		case "TOGGLE_RUNNING":
			return Object.assign({}, state, {
				list: [
					...state.list.map(task => {
						if (task.uid === action.payload.task) {
							task.running = !task.running
						}
						return { ...task }
					})
				]
			})
		case "STOP_ALL":
			return Object.assign({}, state, {
				list: [
					...state.list.map(task => {
						task.running = false
						return { ...task }
					})
				]
			})
		default:
			return state
	}
}
