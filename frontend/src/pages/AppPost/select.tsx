import React from 'react'

function SelectInput(props: { values: string[], select: React.ChangeEventHandler<HTMLSelectElement> }) {
	return (
		<div>
			<select className="form-select appearance-none
      block
      w-full
      py-1.5
      text-base
      font-normal
      text-gray-700
      bg-white bg-clip-padding bg-no-repeat
      border border-solid border-gray-300
      rounded
      transition
      ease-in-out
      m-0
			h-10
      focus:text-gray-700 focus:bg-white focus:border-blue-600 focus:outline-none" onChange={props.select}>
				{
					props.values.map((value: string) => {
						return (<option value={value} className="text-clip" key={value}>{value}</option>)
					})
				}
			</select>

		</div>
	)
}

export default SelectInput
