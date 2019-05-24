/* eslint-disable import/prefer-default-export */
export function modals(
	state = {
		createProject: {
			active: false,
			props: {}
		},
		createTask: {
			active: false,
			props: {}
		}
	},
	action
) {
	switch (action.type) {
		case "TOGGLE_MODAL":
			return Object.assign({}, state, {
				[action.payload]: {
					...state[action.payload],
					active: !state[action.payload].active
				}
			})
		case "UPDATE_MODAL_PROPS":
			return Object.assign({}, state, {
				[action.payload.key]: {
					...state[action.payload.key],
					props: { ...state[action.payload.key].props, ...action.payload.props }
				}
			})
		default:
			return state
	}
}
