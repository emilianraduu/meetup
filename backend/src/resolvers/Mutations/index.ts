import * as Users from './User'
import * as Pubs from './Pubs'
import * as Schedule from './Schedule'
import * as Locations from './Locations'

export const Mutation = {
  ...Users,
  ...Pubs,
  ...Schedule,
  ...Locations
}
