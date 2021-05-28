import React from 'react';
import {user} from '../dummyData';

export const UserContext = React.createContext({});
export const UserProvider = UserContext.Provider;

const UserContainer = ({children}) => {
  return (
    <UserProvider
      value={{
        user,
      }}>
      {children}
    </UserProvider>
  );
};
export default UserContainer;
