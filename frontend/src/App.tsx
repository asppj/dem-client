
import Router from './routes'
function App() {
    console.log('import.meta.env', import.meta.env)
    return (
        <div id="App">
            <Router />
            
        </div>
    )
}

export default App
