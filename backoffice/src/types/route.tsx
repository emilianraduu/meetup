import React from 'react'

export interface IRouteType {
	name: string;
	path: string;
	authorized: boolean;
	exact?: boolean;
	component: React.FunctionComponent;
}
