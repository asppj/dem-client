import { Button, Popconfirm, Tooltip } from 'antd';
import { ButtonType } from 'antd/lib/button';
import { SizeType } from 'antd/lib/config-provider/SizeContext';
import { useState } from 'react'

function OkButton(props: { onClick: () => void, content: string, description: string, className?: string, type: ButtonType, size: SizeType,danger?:boolean }) {
	const [visible, setVisible] = useState(false);
	const [confirmLoading, setConfirmLoading] = useState(false);

	const showPopconfirm = () => {
		setVisible(true);
	};

	const handleOk = () => {
		setConfirmLoading(true);
		props.onClick();
		setTimeout(() => {
			setVisible(false);
			setConfirmLoading(false);
		}, 2000);
	};

	const handleCancel = () => {
		console.log('Clicked cancel button');
		setVisible(false);
	};

	return (
		<Popconfirm
			placement="bottom"
			title={props.description}
			visible={visible}
			onConfirm={handleOk}
			okButtonProps={{ loading: confirmLoading }}
			onCancel={handleCancel}
		>
			<Tooltip title={props.description} key={props.content}>
				<Button type={props.type} size={props.size} onClick={showPopconfirm} className={props.className} danger={props.danger}>
					{props.content}
				</Button>
			</Tooltip>
		</Popconfirm>
	);
};

export default OkButton
