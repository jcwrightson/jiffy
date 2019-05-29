/* eslint-disable import/prefer-default-export */
export function selectTimesheetProject(uid) {
	return dispatch => {
		dispatch({
			type: "SELECT_TIMESHEET_PROJECT",
			payload: uid
		})
	}
}
