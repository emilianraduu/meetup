import { objectType } from 'nexus'

export const User = objectType({
  name: 'User',
  definition(t) {
    t.nonNull.int('id')
    t.string('lastName')
    t.string('firstName')
    t.nonNull.string('email')
    t.string('createdAt')
    t.string('updatedAt')
    t.string('photo')
    t.int('maxDistance')
    t.string('status')
    t.list.field('reservations', {type: 'Reservation'})
  }
})

export const Exists = objectType({
  name: 'Exists',
  definition(t) {
    t.boolean('exist')
    t.string('email')
    t.string('firstName')
    t.string('lastName')
    t.string('photo')
  }
})

export const Review = objectType({
  name: 'Review',
  definition(t) {
    t.int('id')
    t.int('rating')
    t.string('comment')
    t.int('userId')
    t.field('user', { type: 'User' })
    t.int('pubId')
    t.field('pub', { type: 'Pub' })
    t.string('createdAt')
  }
})

export const AuthPayload = objectType({
  name: 'AuthPayload',
  definition(t) {
    t.string('accessToken')
    t.field('user', { type: 'User' })
  }
})

export const Pub = objectType({
  name: 'Pub',
  definition(t) {
    t.int('id')
    t.string('address')
    t.list.string('images')
    t.string('name')
    t.string('ownerId')
    t.int('priceAvg')
    t.string('currency')
    t.float('avgRating')
    t.int('distance')
    t.int('freeTable')
    t.float('latitude')
    t.float('longitude')
    t.list.field('schedule', { type: 'Schedule' })
    t.list.field('locations', { type: 'Location' })
    t.list.field('reviews', { type: 'Review' })
    t.field('menu', {type: 'Menu'})
  }
})

export const Menu = objectType({
  name: 'Menu',
  definition(t) {
    t.int('id')
    t.int('pubId')
    t.field('pub', {type: 'Pub'})
    t.list.field('sections', {type: 'MenuSection'})
  }
})


export const MenuSection = objectType({
  name: 'MenuSection',
  definition(t) {
    t.int('id')
    t.string('name')
    t.string('image')
    t.list.field('items', {type: 'MenuItem'})
    t.int('menuId')
    t.field('menu', {type: 'Menu'})
  }
})

export const MenuItem = objectType({
  name: 'MenuItem',
  definition(t) {
    t.int('id')
    t.int('sectionId')
    t.field('section', { type: 'MenuSection' })
    t.string('name')
    t.string('image')
    t.float('price')
    t.string('description')
  }
})

export const Schedule = objectType({
  name: 'Schedule',
  definition(t) {
    t.int('id')
    t.int('dayOfWeek')
    t.string('timeStart')
    t.string('timeEnd')
  }
})


export const Reservation = objectType({
  name: 'Reservation',
  definition(t) {
    t.int('id')
    t.field('pub', { type: 'Pub' })
    t.int('pubId')
    t.string('date')
    t.string('startHour')
    t.string('endHour')
    t.int('userId')
    t.field('user', { type: 'User' })
    t.int('tableId')
    t.field('table', { type: 'Table' })
    t.int('locationId')
    t.field('location', { type: 'Location' })
  }
})

export const Table = objectType({
  name: 'Table',
  definition(t) {
    t.int('id')
    t.int('count')
    t.boolean('occupied')
    t.boolean('blocked')
    t.string('reason')
    t.int('position')
    t.string('name')
    t.field('waiter', { type: 'User' })
    t.int('waiterId')
    t.int('locationId')
    t.field('reservation', { type: 'Reservation' })
    t.int('reservationId')
  }
})


export const Location = objectType({
  name: 'Location',
  definition(t) {
    t.int('id')
    t.string('name')
    t.int('pubId')
    t.int('rows')
    t.int('columns')
    t.list.field('tables', { type: 'Table' })
    // t.list.field('', {type: 'Schedule'})
  }
})
