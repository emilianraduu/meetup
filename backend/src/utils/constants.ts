import { AuthenticationError, UserInputError } from 'apollo-server'

export const tokens = {
  access: {
    name: 'ACCESS_TOKEN',
    expiry: '1d',
  },
}

export const APP_SECRET = process.env.APP_SECRET

export const isDev = () => process.env.NODE_ENV === 'development'

export const errors = {
  notAuthenticated: new AuthenticationError('Unauthenticated user!'),
  userAlreadyExists: new UserInputError('User already exists!'),
  pubAlreadyExists: new UserInputError('Location already exists!'),
  invalidUser: new UserInputError('Invalid username or password'),
  notOwner: new UserInputError('This user is not an owner'),
}

export const user_status = {
  admin: 'OWNER',
  client: 'CLIENT',
  waiter: 'WAITER'
}