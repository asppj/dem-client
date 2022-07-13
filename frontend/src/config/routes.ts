import { lazy } from 'react'
import HomeSVG from '../pages/svgs'

export const Home = lazy(() => import('../pages/home'))
export const About = lazy(() => import('../pages/about'))
export const NotFound = lazy(() => import('../pages/404'))
export const AppPOST = lazy(() => import('../pages/AppPost'))

const routes = [
	{
		path: "/",
		element: AppPOST,
		name: 'AppPost',
		svg: HomeSVG.HomeSvg, // 不支持显示
		tree: [], // 不支持子路由
	},
	{
		path: '/home',
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
