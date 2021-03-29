import React from 'react'
import {BrowserRouter as Router, Route, Switch} from 'react-router-dom'
import {Login} from '../pages/login'
import {Dashboard} from '../pages/dashboard'
import NotFound from '../pages/not-found'

interface IProps {
	children: React.ReactNode;
}

export const MyRouter = ({children}: IProps) => {
	return (
		<Router>
			<Switch>
				<Route exact path="/about">
					<Login/>
				</Route>
				<Route exact path="/users">
					<Login/>
				</Route>
				<Route exact path="/" >
					<Dashboard/>
				</Route>
				<Route  component={NotFound}/>
			</Switch>
			{children}
		</Router>
	)
}
