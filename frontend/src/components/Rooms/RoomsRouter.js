import React, {lazy, useContext} from 'react'
import {AuthContext} from '../Auth/AuthContext'

import {Switch} from 'react-router-dom'
import {PrivateRoute} from '../Global/PrivateRoute'

export const tournamentRoutes = [
    {
        name: 'Rooms',
        path: '/rooms/create',
        component: lazy(() => import('./create/RoomsCreate'))
    },
    {
        name: 'Rooms',
        path: '/rooms/edit/:id',
        component: lazy(() => import('./RoomRooter'))
    },
    {
        name: 'Rooms',
        path: '/rooms',
        exact: true,
        component: lazy(() => import('./listing/RoomsListing'))
    }

]
export default function CoursesRouter() {
    const authContext = useContext(AuthContext)
    const {loggedIn} = authContext.state
    return (
        <>
            <Switch>

                {
                    tournamentRoutes.map((route, index) => (
                            <PrivateRoute
                                key={index} path={route.path}
                                exact={route.exact}
                                allowed={!!loggedIn}
                                redirectTo='/login'
                                component={route.component}
                            />
                        )
                    )
                }
            </Switch>
        </>

    )
}
