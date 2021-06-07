import * as Users from './User'
import * as Pubs from './Pubs'
import * as Schedule from './Schedule'
import * as Locations from './Locations'
import * as Menu from './Menu'

export const Mutation = {
  ...Users,
  ...Pubs,
  ...Schedule,
  ...Locations,
  ...Menu
}
