import { hashFnv32a } from '@/utils/hash';
import { Tag } from 'antd';


const tags = [
	"magenta",
	"red",
	"volcano",
	"orange",
	"gold",
	"lime",
	"green",
	"cyan",
	"blue",
	"geekblue",
	"purple",
]
function TagCard(props: { tag: string }) {
	const color = tags[hashFnv32a(props.tag, tags.length)%tags.length]
	return (
		<Tag color={color}>{props.tag}</Tag>
	)
}

export default TagCard
