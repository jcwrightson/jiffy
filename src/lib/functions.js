import moment from "moment"

export function timeFilter(stamp) {
	const date = new Date(stamp)

	const days = date.getDate() - 1

	const hours = days * 24 + date.getHours() - 1

	const minutes = `0${date.getMinutes()}`

	const seconds = `0${date.getSeconds()}`

	return `${hours}:${minutes.substr(-2)}:${seconds.substr(-2)}`
}

export function getHiddenProp() {
	const prefixes = ["webkit", "moz", "ms", "o"]

	// if 'hidden' is natively supported just return it
	if ("hidden" in document) return "hidden"

	// otherwise loop over all the known prefixes until we find one
	for (let i = 0; i < prefixes.length; i++) {
		if (`${prefixes[i]}Hidden` in document) return `${prefixes[i]}Hidden`
	}

	// otherwise it's not supported
	return null
}

export function isToday(timeStamp) {
	return (
		moment().format("YYMMDD") === moment(timeStamp).format("YYMMDD")
	)
}
export function dayOfWeekfromNum(day) {
	switch (day) {
		case 0: {
			return {
				short: "Sun",
				full: "Sunday"
			}
		}
		case 1: {
			return {
				short: "Mon",
				full: "Monday"
			}
		}
		case 2: {
			return {
				short: "Tue",
				full: "Tuesday"
			}
		}
		case 3: {
			return {
				short: "Wed",
				full: "Wednesday"
			}
		}
		case 4: {
			return {
				short: "Thu",
				full: "Thursday"
			}
		}
		case 5: {
			return {
				short: "Fri",
				full: "Friday"
			}
		}
		case 6: {
			return {
				short: "Sat",
				full: "Saturday"
			}
		}
		default: {
			return false
		}
	}
}

export function copyToClipboard(text) {
	if (window.clipboardData && window.clipboardData.setData) {
		// IE specific code path to prevent textarea being shown while dialog is visible.
		return window.clipboardData.setData("Text", text)
	}
	if (
		document.queryCommandSupported &&
		document.queryCommandSupported("copy")
	) {
		const textarea = document.createElement("textarea")
		textarea.textContent = text
		textarea.style.position = "fixed" // Prevent scrolling to bottom of page in MS Edge.
		document.body.appendChild(textarea)
		textarea.select()
		try {
			return document.execCommand("copy") // Security exception may be thrown by some browsers.
		} catch (ex) {
			console.warn("Copy to clipboard failed.", ex)
			return false
		} finally {
			document.body.removeChild(textarea)
		}
	}
}

export const uuidv4 = () => {
	return ([1e7] + -1e3 + -4e3 + -8e3 + -1e11).replace(/[018]/g, c =>
		(
			c ^
			(crypto.getRandomValues(new Uint8Array(1))[0] & (15 >> (c / 4)))
		).toString(16)
	)
}