

import AceEditor from "react-ace";

import "ace-builds/src-noconflict/mode-json";
import "ace-builds/src-noconflict/theme-xcode";
import "ace-builds/src-noconflict/ext-language_tools";

export const ResponseView = (props: { body: string, placeholder?: string }) => {
	return (
		<AceEditor
			style={{ width: "100%", height: "100%", overflow: "scroll"}}
			mode="json"
			theme="xcode"
			name="body_editor"
			editorProps={{ $blockScrolling: true }}
			placeholder={props.placeholder || "{}"}
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
				autoScrollEditorIntoView: true
			}}
		/>
	)
}


function CodeEditor(props: { body: string, placeholder?: string, change: (value: string) => void }) {
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
			showPrintMargin={true}
			showGutter={true}
			highlightActiveLine={true}
			setOptions={{
				enableBasicAutocompletion: true,
				enableLiveAutocompletion: true,
				enableSnippets: true,
				showLineNumbers: true,
				tabSize: 2,
				autoScrollEditorIntoView: true
			}}
		/>
	)
}

export default CodeEditor
