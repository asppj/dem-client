import { hashFnv32a } from '@/utils/hash';
import { Tag } from 'antd';
import React from 'react'
import { Md5 } from 'ts-md5/dist/md5';

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
