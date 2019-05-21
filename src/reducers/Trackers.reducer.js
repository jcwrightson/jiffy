export function trackers(
	state = {
		list: []
	},
	action
) {
	switch (action.type) {
		case "LOAD_TRACKERS":
			return Object.assign({}, state, {
				list: [...action.payload]
			})
		case "CREATE_TRACKER":
			return Object.assign({}, state, {
				list: [{ ...action.payload }, ...state.list]
			})
		case "TOGGLE_RUNNING":
			return Object.assign({}, state, {
				list: [
					...state.list.map(tracker => {
						if (tracker.uid === action.payload.tracker) {
							tracker.running = !tracker.running
						}
						return { ...tracker }
					})
				]
			})
		case "UPDATE_TRACKER":
			return Object.assign({}, state, {
				list: [
					...state.list.map(tracker => {
						if (tracker.uid === action.payload.uid) {
							tracker.time += action.payload.time
						}

						return { ...tracker }
					})
				]
			})
		case "REMOVE_TRACKER":
			return Object.assign({}, state, {
				list: [...state.list.filter(tracker => tracker.uid !== action.payload)]
			})
		case "STOP_ALL":
			return Object.assign({}, state, {
				list: [
					...state.list.map(tracker => {
						tracker.running = false
						return { ...tracker }
					})
				]
			})
		default:
			return state
	}
}
