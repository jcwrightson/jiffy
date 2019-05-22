import React from "react"

const SVG = ({ path }) => {
	return <span dangerouslySetInnerHTML={{ __html: path }} />
}

export default SVG
