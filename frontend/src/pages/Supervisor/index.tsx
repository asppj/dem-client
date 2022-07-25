import { openNotificationWithIcon } from '@/utils/notice'
import { Button, Select } from 'antd'
import React, { useEffect, useState } from 'react'
import { LoadConf, Projects } from '../../../wailsjs/go/supervisor/Service'
import { supervisor } from '../../../wailsjs/go/models';
import CardCtl from './card';
import { RedoOutlined } from '@ant-design/icons';
import TagCard from './tag';
import YamlModal from './yaml';
const { Option } = Select;

function SupervisorPage() {
	const [cfgFileList, setCfgFileList] = useState<string[]>([])
	const [cfgFile, setCfgFile] = useState("")
	const [projects, setProjects] = useState<supervisor.Projects>();
	const [timeNow, setTimeNow] = useState("")
	useEffect(() => {
		// 加载配置文件
		LoadConf().then((conf) => {
			console.log(conf)
			setCfgFileList(conf)
		}).catch((e) => {
			console.log(e);
			openNotificationWithIcon("error", "loadConf", e)
		})

	}, [])
	// 切换配置handler
	const handlerSelectCfg = (cfgFile: string) => {
		setCfgFile(cfgFile)
		// 加载项目
		if (cfgFile != "") {
			Projects(cfgFile).then((res) => {
				console.log("更新projects", res)
				if ("app" in res) {
					console.log("切换配置：", cfgFile, res)
					setProjects(res)
					if (!res.supervisor) {
						openNotificationWithIcon("warning", "Projects", "yaml config  file empty")
						return
					}
					return
				}
				openNotificationWithIcon("error", "Projects", res.message)
			}).catch((e) => {
				console.log(e);
				openNotificationWithIcon("error", "Projects", e)
			})
		}
	}
	return (
		<div>
			<div className="space-x-2">
				<Select defaultValue="选择配置" onChange={(selected) => { handlerSelectCfg(selected) }}>
					<Option value="选择配置" disabled>选择配置</Option>
					{cfgFileList.map((conf) => {
						return (
							<Option value={conf}>{conf}</Option>
						)
					})}
				</Select>
				<Button shape="circle" type="primary" onClick={() => { setTimeNow(Date.now().toString()); handlerSelectCfg(cfgFile) }} icon={<RedoOutlined />} ></Button>
				{
					projects && projects.app && <TagCard tag={projects?.app || ""}></TagCard>
				}
				{
					projects && <YamlModal title="查看配置" yamlObj={projects} placeholder={cfgFile}></YamlModal>
				}
			</div>
			<div className="grid grid-cols-1 2lg:grid-cols-2 text-center" key={cfgFile + timeNow}>
				{
					projects && projects.supervisor ? projects.supervisor.map((project) => {
						return (<>
							<CardCtl key={project.project + timeNow} project={project.project} hosts={project.hosts} actions={projects.appCommand} />
						</>)
					}) : <span className=" justify-center p-48 ring-0 shadow m-6"> empty config file</span>
				}
			</div>
		</div>
	)
}

export default SupervisorPage
