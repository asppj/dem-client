
import AppRouter from '@/pages/layout/routes'
import { useEffect, useState } from 'react'
import { Link, useLocation } from 'react-router-dom'
import routes from '../../config/routes'
import { Logo, Menu as MenuSvg } from '../svgs'
import { Layout } from './namespace'

// 拼接 className
function classNames(...classes: any) {
	return classes.filter(Boolean).join(' ')
}

const MenuItem = (props: { route: Layout.MenuRoute, active: boolean }) => {
	const route = props.route;
	const active = props.active;
	const activeClass = "cursor-pointer h-full flex  items-center text-md text-indigo-700 p-6 tracking-normal border-b-2 border-indigo-700 hover:bg-gray-100";
	const deactiveClass = "cursor-pointer h-full flex items-center  text-md text-gry-800  p-6 tracking-normal hover:bg-blue-100";
	return (
		<li key={route.path}>
			<Link to={route.path}>
				<div className={classNames(active ? activeClass : deactiveClass, "h-12")} >
					{route.name}
				</div>
			</Link>
		</li>
	)
}

export default function AppMenu(props: { routes?: Layout.MenuRoute[] }) {
	// 点击菜单

	const [menuCurrent, selectMenu] = useState<number>(-1); // 默认都不选中
	const navCurrent = useLocation();
	console.log("current", navCurrent)
	// useEffect
	useEffect(() => {
		routes.map((route, index) => {
			if (navCurrent.pathname === route.path) {
				selectMenu(index)
			}
		})
	}, [navCurrent])

	const titleName = "Dem Client"
	const [show, setShow] = useState(false);
	const [profile, setProfile] = useState(false);
	const [loginName, setLoginName] = useState("As")
	const [loginImg, setLoginImg] = useState("https://tuk-cdn.s3.amazonaws.com/assets/components/boxed_layout/bl_1.png")
	return (
		<>
			<div className="absolute bg-gray-200 w-full h-full">
				{/* Navigation starts */}
				{/* Mobile */}
				<div className={show ? "w-full h-full absolute z-40  transform  translate-x-0 " : "   w-full h-full absolute z-40  transform -translate-x-full"}>
					<div className="bg-gray-800 opacity-50 inset-0 fixed w-full h-full" onClick={() => setShow(!show)} />
					<div className="w-64 z-20 absolute left-0 top-0 bg-white shadow flex-col justify-between transition duration-150 ease-in-out h-full">
						<div className="flex flex-col justify-between h-full">
							<div className="px-6 pt-4">
								<div className="flex items-center justify-between">
									<div className="flex items-center">
										<Logo></Logo>
										<p className="text-bold md:text2xl text-base pl-3 text-gray-800">{titleName}</p>
									</div>
									<div id="cross" className=" text-gray-800" onClick={() => setShow(!show)}>
										<svg xmlns="http://www.w3.org/2000/svg" className="icon icon-tabler icon-tabler-x" width={24} height={24} viewBox="0 0 24 24" stroke-width={1} stroke="currentColor" fill="none" stroke-linecap="round" stroke-linejoin="round">
											<path stroke="none" d="M0 0h24v24H0z" />
											<line x1={18} y1={6} x2={6} y2={18} />
											<line x1={6} y1={6} x2={18} y2={18} />
										</svg>
									</div>
								</div>
								{/*  sidecar menu */}

							</div>
							<div className="w-full">
								<div className="flex justify-center mb-4 w-full px-6">
									<div className="relative w-full">
										<div className="text-gray-500 absolute ml-4 inset-0 m-auto w-4 h-4">
											<svg xmlns="http://www.w3.org/2000/svg" className="icon icon-tabler icon-tabler-search" width={16} height={16} viewBox="0 0 24 24" stroke-width={1} stroke="#A0AEC0" fill="none" stroke-linecap="round" stroke-linejoin="round">
												<path stroke="none" d="M0 0h24v24H0z" />
												<circle cx={10} cy={10} r={7} />
												<line x1={21} y1={21} x2={15} y2={15} />
											</svg>
										</div>
										<input className="bg-gray-100 focus:outline-none rounded w-full text-sm text-gray-500 pl-10 py-2" type="text" placeholder="Search" />
									</div>
								</div>
								<div className="border-t border-gray-300">
									<div className="w-full flex items-center justify-between px-6 pt-1">
										<div className="flex items-center">
											<img alt="profile-pic" src="https://tuk-cdn.s3.amazonaws.com/assets/components/boxed_layout/bl_1.png" className="w-8 h-8 rounded-md" />
											<p className=" text-gray-800 text-base leading-4 ml-2">Jane Doe</p>
										</div>
										<ul className="flex">
											<li className="cursor-pointer text-white pt-5 pb-3">
												<svg xmlns="http://www.w3.org/2000/svg" className="icon icon-tabler icon-tabler-messages" width={24} height={24} viewBox="0 0 24 24" stroke-width={1} stroke="#718096" fill="none" stroke-linecap="round" stroke-linejoin="round">
													<path stroke="none" d="M0 0h24v24H0z" />
													<path d="M21 14l-3 -3h-7a1 1 0 0 1 -1 -1v-6a1 1 0 0 1 1 -1h9a1 1 0 0 1 1 1v10" />
													<path d="M14 15v2a1 1 0 0 1 -1 1h-7l-3 3v-10a1 1 0 0 1 1 -1h2" />
												</svg>
											</li>
											<li className="cursor-pointer text-white pt-5 pb-3 pl-3">
												<svg xmlns="http://www.w3.org/2000/svg" className="icon icon-tabler icon-tabler-bell" width={24} height={24} viewBox="0 0 24 24" stroke-width={1} stroke="#718096" fill="none" stroke-linecap="round" stroke-linejoin="round">
													<path stroke="none" d="M0 0h24v24H0z" />
													<path d="M10 5a2 2 0 0 1 4 0a7 7 0 0 1 4 6v3a4 4 0 0 0 2 3h-16a4 4 0 0 0 2 -3v-3a7 7 0 0 1 4 -6" />
													<path d="M9 17v1a3 3 0 0 0 6 0v-1" />
												</svg>
											</li>
										</ul>
									</div>
								</div>
							</div>
						</div>
					</div>
				</div>
				{/* Mobile */}
				<nav className="w-full mx-auto bg-white shadow">
					<div className="container px-6 justify-between h-16 flex items-center lg:items-stretch mx-auto">
						<div className="h-full flex items-center">
							<div className="mr-10 flex items-center">
								<Logo></Logo>
								<h3 className="text-base text-gray-800 font-bold tracking-normal leading-tight ml-3 hidden lg:block">{titleName}</h3>
							</div>
							{/* xl:flex hidden 根据页面大小控制显示 */}
							<ul className="pr-12 md:flex items-center h-10  sm:hidden">
								{routes.map((route, index) => {
									return (<>
										<MenuItem route={route} active={menuCurrent == index}></MenuItem>
									</>)
								})}
							</ul>
						</div>
						<div className="h-full xl:flex items-center justify-end hidden">
							<div className="w-full h-full flex items-center">
								<div className="w-full pr-12 h-full flex items-center border-r">
									<div className="relative w-full">
										<div className="text-gray-500 absolute ml-3 inset-0 m-auto w-4 h-4">
											<svg xmlns="http://www.w3.org/2000/svg" className="icon icon-tabler icon-tabler-search" width={16} height={16} viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" fill="none" stroke-linecap="round" stroke-linejoin="round">
												<path stroke="none" d="M0 0h24v24H0z" />
												<circle cx={10} cy={10} r={7} />
												<line x1={21} y1={21} x2={15} y2={15} />
											</svg>
										</div>
										<input className="border border-gray-100 focus:outline-none focus:border-indigo-700 w-56 rounded text-sm text-gray-500 bg-gray-100 pl-8 py-2" type="text" placeholder="Search" />
									</div>
								</div>
								<div className="w-full h-full flex">
									<div className="w-32 h-full flex items-center justify-center border-r cursor-pointer text-gray-600">
										<svg xmlns="http://www.w3.org/2000/svg" className="icon icon-tabler icon-tabler-bell" width={28} height={28} viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" fill="none" stroke-linecap="round" stroke-linejoin="round">
											<path stroke="none" d="M0 0h24v24H0z" />
											<path d="M10 5a2 2 0 0 1 4 0a7 7 0 0 1 4 6v3a4 4 0 0 0 2 3h-16a4 4 0 0 0 2 -3v-3a7 7 0 0 1 4 -6" />
											<path d="M9 17v1a3 3 0 0 0 6 0v-1" />
										</svg>
									</div>
									<div aria-haspopup="true" className="cursor-pointer w-full flex items-center justify-end relative" onClick={() => setProfile(!profile)}>
										{profile ? (
											<ul className="p-2 w-40 border-r bg-white absolute rounded z-40 left-0 shadow mt-64 ">
												<li className="cursor-pointer text-gray-600 text-sm leading-3 tracking-normal py-2 hover:text-indigo-700 focus:text-indigo-700 focus:outline-none">
													<div className="flex items-center">
														<svg xmlns="http://www.w3.org/2000/svg" className="icon icon-tabler icon-tabler-user" width={20} height={20} viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" fill="none" stroke-linecap="round" stroke-linejoin="round">
															<path stroke="none" d="M0 0h24v24H0z" />
															<circle cx={12} cy={7} r={4} />
															<path d="M6 21v-2a4 4 0 0 1 4 -4h4a4 4 0 0 1 4 4v2" />
														</svg>
														<span className="ml-2">My Profile</span>
													</div>
												</li>
												<li className="cursor-pointer text-gray-600 text-sm leading-3 tracking-normal mt-2 py-2 hover:text-indigo-700 focus:text-indigo-700 focus:outline-none flex items-center">
													<svg xmlns="http://www.w3.org/2000/svg" className="icon icon-tabler icon-tabler-help" width={20} height={20} viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" fill="none" stroke-linecap="round" stroke-linejoin="round">
														<path stroke="none" d="M0 0h24v24H0z" />
														<circle cx={12} cy={12} r={9} />
														<line x1={12} y1={17} x2={12} y2="17.01" />
														<path d="M12 13.5a1.5 1.5 0 0 1 1 -1.5a2.6 2.6 0 1 0 -3 -4" />
													</svg>
													<span className="ml-2">Help Center</span>
												</li>
												<li className="cursor-pointer text-gray-600 text-sm leading-3 tracking-normal mt-2 py-2 hover:text-indigo-700 flex items-center focus:text-indigo-700 focus:outline-none">
													<svg xmlns="http://www.w3.org/2000/svg" className="icon icon-tabler icon-tabler-settings" width={20} height={20} viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" fill="none" stroke-linecap="round" stroke-linejoin="round">
														<path stroke="none" d="M0 0h24v24H0z" />
														<path d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 0 0 2.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 0 0 1.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 0 0 -1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 0 0 -2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 0 0 -2.573 -1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 0 0 -1.065 -2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 0 0 1.066 -2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z" />
														<circle cx={12} cy={12} r={3} />
													</svg>
													<span className="ml-2">Account Settings</span>
												</li>
											</ul>
										) : (
											""
										)}
										<img className="rounded h-10 w-10 object-cover" src={loginImg} alt="logo" />
										<p className="text-gray-800 text-sm ml-2">{loginName}</p>
									</div>
								</div>
							</div>
						</div>
						{/* 设置标志 */}
						<div className="visible xl:hidden flex items-center relative" onClick={() => setShow(!show)}>
							<MenuSvg />
						</div>
					</div>
				</nav>
				{/* Navigation ends */}

				{/* Page title ends */}
				<div className="container mx-auto px-6">
					{/* Remove class [ h-64 ] when adding a card block */}
					{/* Remove class [ border-dashed border-2 border-gray-300 ] to remove dotted border */}
					<div className="container min-h-screen w-full h-64 rounded border-dashed border-2 border-gray-300">{/* Place your content here */
						<AppRouter></AppRouter>
					}</div>
				</div>
			</div>
		</>
	)
}


