import { objectType } from 'nexus'

export const User = objectType({
  name: 'User',
  definition(t) {
    t.nonNull.int('id')
    t.nonNull.string('lastName')
    t.nonNull.string('firstName')
    t.nonNull.string('email')
    t.string('createdAt')
    t.string('updatedAt')
    // t.nonNull.list.field('posts', {
    //   type: 'Post',
    //   resolve(root, _, ctx) {
    //     return ctx.prisma.user.findFirst({ where: { id: root.id } }).posts()
    //   },
    // })
  },
})

export const AuthPayload = objectType({
  name: 'AuthPayload',
  definition(t) {
    t.string('accessToken')
    t.field('user', { type: 'User' })
  },
})
