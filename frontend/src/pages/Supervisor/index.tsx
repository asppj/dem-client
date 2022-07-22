import { openNotificationWithIcon } from '@/utils/notice'
import { Select } from 'antd'
import React, { useEffect, useState } from 'react'
import { LoadConf } from '../../../wailsjs/go/supervisor/Service'

const { Option } = Select;

function SupervisorPage() {
	const [cfgFileList, setCfgFileList] = useState<string[]>([])
	const [cfgFile, setCfgFile] = useState("")
	useEffect(() => {
		LoadConf().then((conf) => {
			console.log(conf)
			setCfgFileList(conf)
		}).catch((e) => {
			console.log(e);
			openNotificationWithIcon("error", "loadConf", e.toString())
		})
	}, [])
	return (
		<div>
			<Select defaultValue="选择配置" onChange={(selected) => { setCfgFile(selected) }}>
				<Option value="选择配置" disabled>选择配置</Option>
				{cfgFileList.map((conf) => {
					return (
						<Option value={conf}>{conf}</Option>
					)
				})}
			</Select>
			<div ></div>
		</div>
	)
}

export default SupervisorPage
