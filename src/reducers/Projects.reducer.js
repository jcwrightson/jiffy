export function projects(
	state = {
		list: []
	},
	action
) {
	switch (action.type) {
		case "CREATE_PROJECT":
			return Object.assign({}, state, {
				list: [...state.list, action.payload]
			})
		case "LOAD_PROJECTS":
			return Object.assign({}, state, {
				list: [...action.payload]
			})
		case "REMOVE_PROJECT":
			return Object.assign({}, state, {
				list: [...state.list.filter(project => project.uid !== action.payload)]
			})
		default:
			return state
	}
}
