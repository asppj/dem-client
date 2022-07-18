

import AceEditor from "react-ace";
import showdown from 'showdown'
import showdownHighlight from 'showdown-highlight'
import ReactJson from 'react-json-view'
import beautify from 'beautify'


import "ace-builds/src-noconflict/mode-json";
import "ace-builds/src-noconflict/theme-xcode";
import "ace-builds/src-noconflict/ext-language_tools";
import { AppPostNS } from "./interface";


export const JsonView = (props: { body: AppPostNS.Response | undefined, placeholder?: string }) => {
	return (
		<div className="p-2  overflow-scroll shadow-xl h-full w-full">
			<ReactJson
				src={props.body ? (props.body.is_json ? JSON.parse(props.body.response) : props) : {}}
			/>
		</div>
	)
}

export const ResponseView = (props: { body: string, placeholder?: string }) => {
	let converter = new showdown.Converter({
		// That's it
		extensions: [showdownHighlight({
			// Whether to add the classes to the <pre> tag
			pre: true
		})]
	});
	let html = converter.makeHtml(props.body)
	return (
		<div className="p-2 select-all overflow-scroll shadow-xl h-full w-full">
			<div dangerouslySetInnerHTML={{ __html: html }} className="overflow-scroll" >
			</div>
		</div>

	)
}


function CodeEditor(props: { body: string, placeholder?: string, change: (value: string) => void }) {
	const body = beautify(props.body, { format: 'json' });
	return (
		<AceEditor
			style={{ width: "100%", height: "100%", overflow: "scroll" }}
			mode="json"
			theme="xcode"
			onChange={props.change}
			name="body_editor"
			editorProps={{ $blockScrolling: true }}
			placeholder={props?.placeholder || "{}"}
			fontSize={12}
			value={body}
			showPrintMargin={true}
			showGutter={true}
			highlightActiveLine={true}
			setOptions={{
				enableBasicAutocompletion: true,
				enableLiveAutocompletion: true,
				enableSnippets: true,
				showLineNumbers: true,
				tabSize: 2,
				autoScrollEditorIntoView: true,
			}}
		/>
	)
}

export default CodeEditor
