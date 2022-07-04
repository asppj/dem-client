import { Suspense } from 'react'
import { HashRouter, Routes, Route } from 'react-router-dom'
import routes, { Home, About, NotFound } from './config/routes'

const Router = () => {
  const myRoutes = routes.map((item) => {
    return <Route key={item.path} {...item} element={<item.element/>}/>
  })
  return ( 
    <HashRouter>
      <Suspense fallback={<div>Loading...</div>}>
        <Routes>
          {myRoutes}
        </Routes>
      </Suspense>
    </HashRouter>
  )
}

export default Router
