import React from 'react'
import Navbar from '../Components/Dashboard/Components/Navbar'
import Sidebar from '../Components/Dashboard/Components/Sidebar'
import { Switch, Redirect, Route } from 'react-router-dom'
import Users from '../Components/Dashboard/Pages/Users'
import PaydayLoan from '../Components/Dashboard/Pages/PaydayLoan'
import SMELoan from '../Components/Dashboard/Pages/SMELoan'
import Agents from '../Components/Dashboard/Pages/Agents'
import Admin from '../Components/Dashboard/Pages/Admin'

export default function Dashboard() {
    return (
        <div className="w-screen h-screen flex">
            <div className="w-72 h-full bg-gray-200 z-20 shadow-lg">
                <Sidebar />
            </div>
            <div className="flex-1">
                <Navbar />
                <div className="flex-1 overflow-y-auto pt-10 pl-8 pr-8">
                    <Switch>
                        <Route path="/dashboard" exact render={() => <Redirect to="/dashboard/users" />}/>
                        <Route path="/dashboard/users" component={Users} exact/>
                        <Route path="/dashboard/paydayloans" component={PaydayLoan} exact/>
                        <Route path="/dashboard/smeloans" component={SMELoan} exact />
                        <Route path="/dashboard/agents" component={Agents} exact />
                        <Route path="/dashboard/admins" component={Admin} exact />
                    </Switch>
                </div>
            </div>
        </div>
    )
}
