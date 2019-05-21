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
		case "EDIT_PROJECT":
			return Object.assign({}, state, {
				list: [
					...state.list.map(project => {
						if (project.uid === action.payload.uid) {
							return {...project, ...action.payload.body}
						}
						return project
					})
				]
			})
		case 'TOGGLE_EDIT':
		return Object.assign({}, state, {
			list: [
				...state.list.map(project => {
					if (project.uid === action.payload) {
						return {...project, editing: !project.editing}
					}
					return project
				})
			]
		})
		default:
			return state
	}
}
