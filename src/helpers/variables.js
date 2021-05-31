import {makeVar, InMemoryCache} from '@apollo/client';
export const cache = new InMemoryCache({});
export const isLoggedIn = makeVar(false);
export const user = makeVar(undefined);
export const token = makeVar(undefined);

export const showError = makeVar(false);
