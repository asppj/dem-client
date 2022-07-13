import { Suspense } from 'react'
import { Routes, Route } from 'react-router-dom'
import routes from '../../config/routes'

const AppRouter = () => {
	const myRoutes = routes.map((item) => {
		return <Route key={item.path} {...item} element={<item.element />} />
	})

	return (
		< div className="container border-2 p-1 min-h-screen" >
			<Suspense fallback={< div className="bg-slate-300 " > Loading...</ div>}>
				<Routes >
					{myRoutes}
				</Routes>
			</Suspense >
		</div >
	)
}

export default AppRouter
