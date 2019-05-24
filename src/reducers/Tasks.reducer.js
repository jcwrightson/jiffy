/* eslint-disable import/prefer-default-export */
export function tasks(
	state = {
		includeArchived: true,
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
		case "START_TASK":
			return Object.assign({}, state, {
				list: [
					...state.list.map(task => {
						if (task.uid === action.payload) {
							return { ...task, running: true }
						}
						return { ...task }
					})
				]
			})
		case "STOP_TASK":
			return Object.assign({}, state, {
				list: [
					...state.list.map(task => {
						if (task.uid === action.payload) {
							return { ...task, running: false }
						}
						return { ...task }
					})
				]
			})
		case "EDIT_TASK":
			return Object.assign({}, state, {
				list: [
					...state.list.map(task => {
						if (task.uid === action.payload.uid) {
							return { ...task, ...action.payload.body }
						}
						return task
					})
				]
			})
		case "TOGGLE_ARCHIVE_TASK":
			return Object.assign({}, state, {
				list: [
					...state.list.map(task => {
						if (task.uid === action.payload) {
							return { ...task, archived: !task.archived }
						}
						return task
					})
				]
			})
		case "TOGGLE_EDIT_TASK":
			return Object.assign({}, state, {
				list: [
					...state.list.map(task => {
						if (task.uid === action.payload) {
							return { ...task, editing: !task.editing }
						}
						return task
					})
				]
			})
		case "TOGGLE_MENU":
			return Object.assign({}, state, {
				list: [
					...state.list.map(task => {
						if (task.uid === action.payload) {
							return { ...task, menuActive: !task.menuActive }
						}
						return task
					})
				]
			})
		case "STOP_ALL":
			return Object.assign({}, state, {
				list: [
					...state.list.map(task => {
						return { ...task, running: false }
					})
				]
			})
		default:
			return state
	}
}
