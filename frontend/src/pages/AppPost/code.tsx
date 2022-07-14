import React from 'react'

function CodeHighlighter(props: { body: string, change: (value: string) => void }) {
	return (
		<div className="cursor-pointer select-all m-auto p-auto">
			<input type="textarea" className="w-full ring-1 h-auto"></input>
		</div>
	)
}

export default CodeHighlighter
