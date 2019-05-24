import { store } from "../store"
import { isToday, uuidv4 } from "./functions"
import {
	createTracker,
	removeTracker,
	createProject,
	createTask
} from "../actions"

const houseKeeping = () => {
	// localStorage.removeItem("jiffy")

	window.addEventListener("beforeunload", () => {
		store.dispatch({ type: "STOP_ALL" })
		const save = {
			projects: store.getState().projects.list,
			tasks: store.getState().tasks.list,
			trackers: store.getState().trackers.list
		}

		localStorage.setItem("jiffy", JSON.stringify(save))
	})

	const savedData = JSON.parse(localStorage.getItem("jiffy"))

	if (savedData) {
		store.dispatch({ type: "LOAD_PROJECTS", payload: savedData.projects })
		store.dispatch({ type: "LOAD_TASKS", payload: savedData.tasks })
		store.dispatch({ type: "LOAD_TRACKERS", payload: savedData.trackers })
	} else {
		const projectUID = uuidv4()
		store.dispatch(createProject("Sample Project", projectUID))
		store.dispatch(createTask(projectUID, "Sample Task"))
	}

	// Add today's trackers
	if (savedData && savedData.tasks) {
		savedData.tasks.map(task => {
			const { length } = savedData.trackers
				.filter(tracker => tracker.task === task.uid)
				.filter(tracker => isToday(tracker.created))
			if (length === 0) {
				store.dispatch(createTracker(task.project, task.uid))
			}
		})
	}

	// Remove obsolete trackers
	if (savedData && savedData.trackers) {
		savedData.trackers
			.filter(tracker => !isToday(tracker.created) && tracker.time === 0)
			.map(tracker => store.dispatch(removeTracker(tracker.uid)))
	}
}

export default houseKeeping
