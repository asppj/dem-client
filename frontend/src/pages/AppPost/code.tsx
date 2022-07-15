

import AceEditor from "react-ace";

import "ace-builds/src-noconflict/mode-json";
import "ace-builds/src-noconflict/theme-xcode";
import "ace-builds/src-noconflict/ext-language_tools";

export const ResponseView = (props: { body: string }) => {
	return (
		<AceEditor
			mode="json"
			theme="xcode"
			name="body_editor"
			editorProps={{ $blockScrolling: true }}
			placeholder="{}"
			fontSize={12}
			showPrintMargin={true}
			showGutter={true}
			highlightActiveLine={true}
			setOptions={{
				enableBasicAutocompletion: true,
				enableLiveAutocompletion: true,
				enableSnippets: true,
				showLineNumbers: true,
				tabSize: 2,
				readonly: true,
			}}
		/>
	)
}


function CodeEditor(props: { body: string, change: (value: string) => void }) {
	return (
		<div className="overflow-scroll w-full h-full flex-grow  content-around ">
			<AceEditor
				mode="json"
				theme="xcode"
				onChange={props.change}
				name="body_editor"
				editorProps={{ $blockScrolling: true }}
				placeholder="{}"
				fontSize={12}
				showPrintMargin={true}
				showGutter={true}
				highlightActiveLine={true}
				setOptions={{
					enableBasicAutocompletion: true,
					enableLiveAutocompletion: true,
					enableSnippets: true,
					showLineNumbers: true,
					tabSize: 2
				}}
			/>
		</div>

	)
}

export default CodeEditor
