import { objToStrYaml } from '@/utils/yaml';
import { Button, Modal } from 'antd'
import { useState } from 'react'
import AceEditor from "react-ace";

import "ace-builds/src-noconflict/mode-yaml";
import "ace-builds/src-noconflict/theme-xcode";
import "ace-builds/src-noconflict/ext-language_tools";

import showdown from 'showdown'
import showdownHighlight from 'showdown-highlight'


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
	// const body = beautify(props.body, { format: 'yaml' });
	console.log("body", props.body)
	return (
		<AceEditor
			style={{ width: "100%", height: "100%", overflow: "scroll" }}
			mode="yaml"
			theme="xcode"
			onChange={props.change}
			name="body_editor"
			editorProps={{ $blockScrolling: true }}
			placeholder={props?.placeholder || "{}"}
			fontSize={12}
			value={props.body}
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

function YamlModal(props: { title: string, yamlObj: any, placeholder: string }) {
	const [isModalVisible, setIsModalVisible] = useState(false);

	const showModal = () => {
		setIsModalVisible(true);
	};

	const handleOk = () => {
		setIsModalVisible(false);
	};

	const handleCancel = () => {
		setIsModalVisible(false);
	};
	const body = objToStrYaml(props.yamlObj);
	console.log("body.objToStrYaml:", body)
	return (
		<>
			<Button type="default" size="small" onClick={showModal}>
				{props.title}
			</Button>
			<Modal title="Basic Modal" visible={isModalVisible} onOk={handleOk} onCancel={handleCancel}>
				{/* <CodeEditor body={body} placeholder={props.placeholder} change={() => { }} /> */}
				{/* <ResponseView body={body} placeholder={props.placeholder}  /> */}
				<div className=" bg-slate-100 shadow hover:bg-slate-200 cursor-all p-2 scroll-m-4 h-screen overflow-scroll">
					<code className="whitespace-pre-line" dangerouslySetInnerHTML={{ __html: body }}></code>
				</div>
			</Modal>
		</>
	)
}

export default YamlModal
