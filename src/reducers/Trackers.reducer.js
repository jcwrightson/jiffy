/* eslint-disable import/prefer-default-export */
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
		case "START_TRACKER":
			return Object.assign({}, state, {
				list: [
					...state.list.map(tracker => {
						if (tracker.uid === action.payload.uid) {
							return {
								...tracker,
								interval: action.payload.interval,
								running: true
							}
						}
						return { ...tracker }
					})
				]
			})
		case "STOP_TRACKER":
			return Object.assign({}, state, {
				list: [
					...state.list.map(tracker => {
						if (tracker.uid === action.payload.uid) {
							return {
								...tracker,
								interval: null,
								running: false
							}
						}
						return { ...tracker }
					})
				]
			})
		case "UPDATE_TRACKER_TIME":
			return Object.assign({}, state, {
				list: [
					...state.list.map(tracker => {
						if (tracker.uid === action.payload.uid) {
							return {
								...tracker,
								time: tracker.time + action.payload.time
							}
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
						return { ...tracker, running: false }
					})
				]
			})
		default:
			return state
	}
}
