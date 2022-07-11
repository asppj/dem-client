import React, { Suspense } from 'react'
import { Link } from 'react-router-dom'

export const Nav = (props: { routes: RouteItem[] }) => {
	const avgNode = (item: React.ReactNode | undefined) => {
		if (item === undefined) {
			return <></>
		}
		return <>
			<p className="m-1 p-1">{item}</p>
		</>
	}
	const navItems = props.routes.map((route) => {
		return <button className="btn">
			<Link to={route.path}>
				 {route.name}
			</Link>
		</button>
	})
	return (
		<Suspense fallback={<div>nav loading...</div>}>
			<nav>
				{navItems}
			</nav>

		</Suspense>
	)
}



export const Navigation = () => {
	return (
		<div>Navigation</div>
	)
}
