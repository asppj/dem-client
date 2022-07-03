import { lazy } from 'react'

export const Home = lazy(() => import('../pages/home'))
export const About = lazy(() => import('../pages/about'))
export const NotFound = lazy(() => import('../pages/404'))

const routes = [
  {
    path:'/',
    exact: true,
    element: Home,
    name:'Home'
  },
  {
    path:'/home',
    element: Home,
    name:'Home'
  },
  {
    path:'/about',
    element: About,
    name:'About'
  },
  {
    path: '/404',
    element: NotFound,
    name:'404'
  },
]
export default routes