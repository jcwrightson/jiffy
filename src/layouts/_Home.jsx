import React, { Component } from "react"
import { Route, Switch } from "react-router-dom"
import { connect } from "react-redux"
import ProjectsContainer from "../containers/_Projects"

import "../lib/flexable.css"
import "../sass/styles.scss"

import { store } from "../store"
import { getHiddenProp, isToday } from "../functions"

class renderApp extends Component {
	constructor(props) {
		super(props)

		this.onUnload = this.onUnload.bind(this)
	}

	addTodayTracker(projects) {
		projects.map(project => {
			if (
				project.trackers.filter(tracker => {
					return isToday(tracker)
				}).length === 0
			) {
				store.dispatch({
					type: "ADD_TRACKER",
					payload: { project: project.created }
				})
			}
		})
	}

	onUnload() {
		store.dispatch({ type: "STOP_ALL" })
		store.dispatch({ type: "FILTER_BLANK" })

		if (this.props.projects) {
			localStorage.setItem("tracker", JSON.stringify(this.props.projects))
		}
	}

	componentDidMount() {
		window.addEventListener("beforeunload", this.onUnload)
		const projects = JSON.parse(localStorage.getItem("tracker"))

		if (projects) {
			store.dispatch({ type: "BOOTSTRAP", payload: projects })
		}

		const isHidden = () => {
			const prop = getHiddenProp()
			if (!prop) return false
			return document[prop]
		}

		const visProp = getHiddenProp()
		if (visProp) {
			const evtname = `${visProp.replace(
				/[H|h]idden/,
				""
			)}visibilitychange`
			document.addEventListener(evtname, () => {
				if (!isHidden()) {
					this.addTodayTracker(this.props.projects)
				} else {
					localStorage.setItem(
						"tracker",
						JSON.stringify(this.props.projects)
					)
				}
			})
		}
	}

	componentWillReceiveProps(props) {
		if (props !== this.props) {
			this.addTodayTracker(props.projects)
		}
	}

	componentWillUnmount() {
		window.removeEventListener("beforeunload", this.onUnload)
	}

	render() {
		return (
			<div className='App'>
				<Switch>
					<Route path='/' component={ProjectsContainer} />
				</Switch>
			</div>
		)
	}
}

const mapStateToProps = state => {
	return {
		projects: state.projects
	}
}

const Session = connect(mapStateToProps)(renderApp)
export default Session
