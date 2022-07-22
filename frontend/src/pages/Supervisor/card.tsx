import { useState } from 'react'
import { Skeleton, Avatar, Card, Tooltip, Button } from 'antd';
import { RunCmd } from '../../../wailsjs/go/supervisor/Service';
import { openNotificationWithIcon } from '@/utils/notice';

const { Meta } = Card;


function CardCtl(props: { project: string, hosts: string[], actions: string[] }) {
	const [state, setState] = useState({
		loading: false,
	});

	const onChange = (checked: boolean) => {
		setState({ loading: !checked });
	};

	const { loading } = state;
	console.log("actions:", props.actions)
	const cardClass = "flex-1  m-0 ring-1"

	const [logSpan, setLogSpan] = useState("")
	// handler RunShell
	const handlerRunShell = (name: string, hosts: string[], ctl: string) => {
		console.log("runShell", name, hosts, ctl)
		RunCmd(name, hosts, ctl).then((out) => {
			if (out) {
				setLogSpan((out as Array<string>).join("\n"));
				hosts.forEach((host) => {
					openNotificationWithIcon("success", "runShell", `${name}/${host}/${ctl}`)
				})
			}
		}).catch(err => { console.error(err); openNotificationWithIcon("error", "runShell", err) })
	}

	// actions 
	const actions = Object.keys(props.actions).map((action, index) => {
		// console.log("action.map", index, action)
		const ctl = (props.actions as any)[action]
		return (
			<Tooltip title={ctl} key={action}>
				<Button type="primary" size="small" onClick={() => { handlerRunShell(props.project, props.hosts, ctl) }} >{action}</Button>
			</Tooltip>
		)
	})
	return (
		<div className="flex p-6">
			<div className={cardClass}>
				{/* <Switch checked={!loading} onChange={onChange} /> */}
				<Card
					style={{ width: 550 }}
					actions={actions}
				>
					<Skeleton loading={loading} avatar active>
						<Meta
							avatar={
								<Avatar src="https://zos.alipayobjects.com/rmsportal/ODTLcjxAfvqbxHnVXCYX.png" />
							}
							title={props.project}
							description={logSpan}
						/>
					</Skeleton>
				</Card>
			</div>
		</div>
	);
}

export default CardCtl


