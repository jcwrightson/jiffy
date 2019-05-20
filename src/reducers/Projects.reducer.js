export function newProjects(
	state = {
		list: []
	},
	action
) {
	switch (action.type) {
		case "CREATE_PROJECT":
			return Object.assign({}, state, {
				list: [action.payload, ...state.list]
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
