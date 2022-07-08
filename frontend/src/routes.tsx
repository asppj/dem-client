import { Suspense } from 'react'
import { HashRouter, Routes, Route, Link } from 'react-router-dom'
import routes, { Home, About, NotFound } from './config/routes'

const Router = () => {
	const myRoutes = routes.map((item) => {
		return <Route key={item.path} {...item} element={<item.element />} />
	})
	const navItems = routes.map((item) => {
		return <button className="btn focus:outline-none focus:shadow-outline">
			<Link to={item.path}>{item.name}</Link>
		</button>
	})
	return (
		<HashRouter>
			<nav className="flex flex-col rounded">
				{navItems}
			</nav>
			<Suspense fallback={<div className="bg-slate-300">Loading...</div>}>
				<Routes>
					{myRoutes}
				</Routes>
			</Suspense>
		</HashRouter>
	)
}

export default Router
