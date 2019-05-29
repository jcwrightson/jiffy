/* eslint-disable import/prefer-default-export */
export function timesheet(
	state = {
		project: "all",
		task: "all"
	},
	action
) {
	switch (action.type) {
		case "SELECT_TIMESHEET_PROJECT":
			return Object.assign({}, state, {
				...state,
				project: action.payload
			})
		case "SELECT_TIMESHEET_TASK":
			return Object.assign({}, state, {
				...state,
				task: action.payload
			})
		default:
			return state
	}
}
