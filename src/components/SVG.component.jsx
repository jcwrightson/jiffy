import React from "react"

const SVG = ({ file }) => {
	return <span className="svg" dangerouslySetInnerHTML={{ __html: file }} />
}

export default SVG
