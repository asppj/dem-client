import { Suspense } from 'react'
import { HashRouter as Router, Routes, Route, Link } from 'react-router-dom'
import routes from './config/routes'

const AppRouter = () => {
	const myRoutes = routes.map((item) => {
		return <Route key={item.path} {...item} element={<item.element />} />
	})
	// const navItems = routes.map((item) => {
	// 	return <button className="btn">
	// 		<Link to={item.path}>{item.name}</Link>
	// 	</button>
	// })
	return (
		// <Router>

		< div className="container border-2 p-1 min-h-screen" >
			{/* <Nav routes={routes}></Nav> */}
			<Suspense fallback={< div className="bg-slate-300 " > Loading...</ div>}>
				<Routes >
					{myRoutes}
				</Routes>
			</Suspense >
		</div >

		// </Router>
	)
}

export default AppRouter
