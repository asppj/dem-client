import { openNotificationWithIcon } from '@/utils/notice'
import { Select } from 'antd'
import React, { useEffect, useState } from 'react'
import { LoadConf, Projects } from '../../../wailsjs/go/supervisor/Service'
import { supervisor } from '../../../wailsjs/go/models';
import CardCtl from './card';
const { Option } = Select;

function SupervisorPage() {
	const [cfgFileList, setCfgFileList] = useState<string[]>([])
	const [cfgFile,setCfgFile]=useState("")
	const [projects, setProjects] = useState<supervisor.Projects>();
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
				console.log(res)
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
			<Select defaultValue="选择配置" onChange={(selected) => { handlerSelectCfg(selected) }}>
				<Option value="选择配置" disabled>选择配置</Option>
				{cfgFileList.map((conf) => {
					return (
						<Option value={conf}>{conf}</Option>
					)
				})}
			</Select>
			<div className="grid grid-cols-2 text-center" key={cfgFile}>
				{
					projects && projects.supervisor? projects.supervisor.map((project) => {
						return (<>
							<CardCtl key={project.project} project={project.project} hosts={project.hosts} actions={projects.appCommand} ></CardCtl>
						</>)
					}):<span className=" justify-center p-48 ring-0 shadow m-6"> empty config file</span>
				}
			</div>
		</div>
	)
}

export default SupervisorPage
