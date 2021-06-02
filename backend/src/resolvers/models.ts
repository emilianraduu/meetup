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
    // t.nonNull.list.field('posts', {
    //   type: 'Post',
    //   resolve(root, _, ctx) {
    //     return ctx.prisma.user.findFirst({ where: { id: root.id } }).posts()
    //   },
    // })
  },
})

export const Exists = objectType({
  name: 'Exists',
  definition(t) {
    t.boolean('exist')
    t.string('email')
    t.string('firstName')
    t.string('lastName')
    t.string('photo')
  },
})

export const Reviews = objectType({
  name: 'Reviews',
  definition(t) {
    t.int('id')
    t.int('rating')
    t.string('comment')
    t.int('userId')
    t.field('user', {type: 'User'})
    t.int('pubId')
    t.field('pub', {type: 'Pub'})
    t.string('createdAt')
  }
})

export const AuthPayload = objectType({
  name: 'AuthPayload',
  definition(t) {
    t.string('accessToken')
    t.field('user', { type: 'User' })
  },
})

export const Pub = objectType({
  name: 'Pub',
  definition(t) {
    t.int('id')
    t.string('address')
    t.string('images')
    t.string('name')
    t.string('ownerId')
    t.int('priceAvg')
    t.float('avgRating')
    t.int('freeTable')
    t.int('latitude')
    t.int('longitude')
  },
})
