import { lazy } from 'react'
import HomeSVG from '../pages/svgs/home'

export const Home = lazy(() => import('../pages/home'))
export const About = lazy(() => import('../pages/about'))
export const NotFound = lazy(() => import('../pages/404'))
export const Main = lazy(() => import('../pages/layout'))

const routes = [
	// {
	// 	path: "/",
	// 	element: Main,
	// 	name: 'main',
	// },
	{
		path: '/',
		element: About,
		name: 'Home',
		svg: HomeSVG.HomeSvg,
		tree: [],
	},
	{
		path: '/about',
		element: About,
		name: 'About',
		svg: HomeSVG.DashboardSVG,
		tree: [{
			path: '/',
			element: About,
			name: 'Home',
			svg: HomeSVG.HomeSvg,
			tree: [],
		}]
	},
	{
		path: '/404',
		element: NotFound,
		name: '404',
		svg: HomeSVG.DashboardSVG,
		tree: [{
			path: '/',
			element: About,
			name: 'Home',
			svg: HomeSVG.HomeSvg,
			tree: [],
		}]
	},
]
export default routes
