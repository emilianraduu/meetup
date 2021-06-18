import {InMemoryCache, makeVar} from '@apollo/client';

export const cache = new InMemoryCache({});
export const isLoggedIn = makeVar(false);
export const user = makeVar(undefined);
export const token = makeVar(undefined);
export const pubs = makeVar(undefined);
export const pubImages = makeVar({});
export const selectedPub = makeVar(undefined);
export const lat = makeVar(undefined);
export const long = makeVar(undefined);
export const selectedLocation = makeVar(undefined);
export const date = makeVar(new Date());
export const selectedDistance = makeVar(5000);
export const userFriends = makeVar([]);

export const showError = makeVar(false);
