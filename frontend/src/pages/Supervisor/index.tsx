import { openNotificationWithIcon } from '@/utils/notice'
import { Select } from 'antd'
import React, { useEffect, useState } from 'react'
import { LoadConf, Projects } from '../../../wailsjs/go/supervisor/Service'
import { supervisor } from '../../../wailsjs/go/models';
import CardCtl from './card';
const { Option } = Select;

function SupervisorPage() {
	const [cfgFileList, setCfgFileList] = useState<string[]>([])

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
		// 加载项目
		if (cfgFile != "") {
			Projects(cfgFile).then((project) => {
				console.log(project)
				if ("app" in project) {
					console.log("切换配置：", cfgFile, project)
					setProjects(project)
					return
				}
				openNotificationWithIcon("error", "Projects", project.toString())
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
			<div className="grid grid-cols-2">
				{
					projects && projects.supervisor.map((project) => {
						return (<>
							<CardCtl project={project.project} hosts={project.hosts} actions={projects.appCommand} ></CardCtl>
						</>)
					})
				}
			</div>
		</div>
	)
}

export default SupervisorPage
