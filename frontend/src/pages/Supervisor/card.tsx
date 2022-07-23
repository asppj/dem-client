import { useState } from 'react'
import { Skeleton, Avatar, Card, Tooltip, Button, Radio, Select, Switch, Checkbox } from 'antd';
import { RunCmd } from '../../../wailsjs/go/supervisor/Service';
import { openNotificationWithIcon } from '@/utils/notice';
import CardStatus from './card-status';

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
	const cardClass = "flex-1  m-0 p-1 ring-0"

	const [logSpan, setLogSpan] = useState<string[]>([])
	// handler RunShell
	const handlerRunShell = (name: string, hosts: string[], ctl: string) => {
		console.log("runShell", name, hosts, ctl)
		RunCmd(name, hosts, ctl).then((out) => {
			if (out) {
				setLogSpan(out as Array<string>);
				hosts.forEach((host) => {
					openNotificationWithIcon("success", "runShell", `${name}/${host}/${ctl}`)
				})
			}
		}).catch(err => { console.error(err); openNotificationWithIcon("error", "runShell", err) })
	}

	// 选中host
	const [selectedHostIdx, setSelectedHostIdx] = useState(props.hosts.map((e) => { return { host: e, checked: true } }))
	// 增删选中的hosts
	const handlerChangeSelectedHost = (checked: boolean, idx: number) => {
		let newHostsIdx = [...selectedHostIdx]
		newHostsIdx[idx].checked = checked;
		setSelectedHostIdx(newHostsIdx)
	}

	// actions 
	const actions = Object.keys(props.actions).map((action, index) => {
		// console.log("action.map", index, action)
		const ctl = (props.actions as any)[action]
		return (
			<Tooltip title={ctl} key={action}>
				<Button type="primary" size="small" onClick={() => { handlerRunShell(props.project, selectedHostIdx.filter((e) => { return e.checked }).map(e => e.host), ctl) }} >{action}</Button>
			</Tooltip>
		)
	})
	return (
		<div className="flex shadow-md rounded p-1 pb-10">
			<div className={cardClass}>
				{/* <Switch checked={!loading} onChange={onChange} /> */}
				<Card
					style={{ width: "100%" }}
					actions={actions}
				>
					<Skeleton loading={loading} avatar active>
						<Meta
							avatar={
								<Avatar src="https://zos.alipayobjects.com/rmsportal/ODTLcjxAfvqbxHnVXCYX.png" />
							}
							title={props.project}
							// description={props.hosts.join("\n\n")}
							description={
								<div className={cardClass}>
									{
										selectedHostIdx.map((e, idx) => {
											return (
												<>
													<div className="flex flex-row text-center justify-between">
														<Checkbox className="h-auto p-auto" defaultChecked={e.checked} onChange={(e) => { handlerChangeSelectedHost(e.target.checked, idx) }}>
														</Checkbox>
														<CardStatus project={props.project} host={e.host} ctl={(props.actions as any).Status} />
													</div>
												</>
											)
										})
									}
								</div>
							}

						/>
					</Skeleton>
				</Card>
				{
					logSpan&&logSpan.length>0 ?
						<div className="shadow bg-white p-2 mt-1 rounded">
							{logSpan.map((e, i) => {
								return (
									<div className="text-start flex flex-row">
										<p>{i + 1}、</p><p>{e}</p>
									</div>
								)
							})}
						</div> : <div hidden></div>
				}

			</div>
		</div>
	);
}

export default CardCtl


