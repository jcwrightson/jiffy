/* eslint-disable import/prefer-default-export */
export function toggleModal(key) {
	return dispatch => {
		dispatch({
			type: "TOGGLE_MODAL",
			payload: key
		})
	}
}

export function updateModalProps(key, props) {
	return dispatch => {
		dispatch({
			type: "UPDATE_MODAL_PROPS",
			payload: { key, props }
		})
	}
}
