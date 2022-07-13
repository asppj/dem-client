import { HashRouter as GlobalRouter } from "react-router-dom";
import AppMenu from "./pages/layout/menu";
import routes from "./config/routes";
export default function App() {
	return (
		<GlobalRouter>
			<AppMenu routes={routes}></AppMenu>
		</GlobalRouter>
	);
}
