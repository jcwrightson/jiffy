/* eslint-disable react/no-danger */
import React from "react"

const SVG = ({ file, classList }) => {
	return (
		<span
			className={`svg ${classList}`}
			dangerouslySetInnerHTML={{ __html: file }}
		/>
	)
}

export default SVG
