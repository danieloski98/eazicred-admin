import { BrowserRouter as Router, Route as BroswerRoute, Routes } from 'react-router-dom'
import Dashboard from './Dashboard'
import Login from './Login'
function Route() {
    return (
        <Router>
            <Routes>
                <BroswerRoute path='/' element={<Login />} />
                <BroswerRoute path='/dashboard/' element={<Dashboard />} />
            </Routes>
        </Router>
    )
}

export default Route
