import { openNotificationWithIcon } from '@/utils/notice';
import { useEffect, useState } from 'react'
import { RunCmd } from '../../../wailsjs/go/supervisor/Service';
import TagCard from './tag';

const CardStatus = (props: { project: string, host: string, ctl: string }) => {
	const [status, setStatus] = useState("未获取到状态")
	// handler 刷新状态
	const handlerRefresh = () => {
		RunCmd(props.project, [props.host], props.ctl).then((out) => {
			if (out) {
				setStatus((out as Array<string>).join("\n"));
			}
		}).catch(err => {
			console.error(err);
			// openNotificationWithIcon("error", "CardStatus", err)
		})
	}
	useEffect(() => {
		handlerRefresh()
	}, [])
	return (
		<div className="flex flex-row p-1 gap-1  hover:shadow hover:shadow-blue-300 shadow-red-500 hover:cursor-pointer justify-start align-start" onClick={handlerRefresh}>
			<div className=""><TagCard tag={props.host} /> </div>
			<div className="text-center"><TagCard tag={status} /></div>
		</div>
	)
}

export default CardStatus
