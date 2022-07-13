import React from 'react'

function SelectInput(props: { values: string[] }) {
	return (
		<div>
			<select>
				{
					props.values.map((value: string) => {
						return (<option value={value} className="text-clip">{value}</option>)
					})
				}
			</select>

		</div>
	)
}

export default SelectInput
