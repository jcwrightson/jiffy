export function newTasks(
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
		default:
			return state
	}
}
