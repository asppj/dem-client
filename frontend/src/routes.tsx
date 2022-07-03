import { Suspense } from 'react'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import routes, { Home, About, NotFound } from './config/routes'

const Router = () => {
  const myRoutes = routes.map((item) => {
    return <Route key={item.path} {...item} element={<item.element/>}/>
  })
  return ( 
    <BrowserRouter>
      <Suspense fallback={<div>Loading...</div>}>
        <Routes>
          {myRoutes}
        </Routes>
      </Suspense>
    </BrowserRouter>
  )
}

export default Router