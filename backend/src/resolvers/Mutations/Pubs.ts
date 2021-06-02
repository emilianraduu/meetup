import { extendType, intArg, nonNull, stringArg } from 'nexus'
import { handleError } from '../../utils/helpers'
import { errors, user_status } from '../../utils/constants'

export const pub = extendType({
  type: 'Mutation',
  definition(t) {
    t.field('createPub', {
      type: 'Pub',
      args: {
        name: nonNull(stringArg()),
        address: nonNull(stringArg()),
        images: stringArg({ list: true }),
        latitude: nonNull(intArg()),
        longitude: nonNull(intArg())
      },
      async resolve(_parent, { name, address, images, latitude, longitude }, ctx) {
        let user = null
        try {
          user = await ctx.prisma.user.findUnique({
            where: {
              id: ctx.userId
            }
          })
        } catch (e) {
          handleError(errors.invalidUser)
        }

        if (!user) handleError(errors.invalidUser)
        if(user && user.status !== user_status.admin) handleError(errors.notOwner)
        try {
          const pub = await ctx.prisma.pub.create({
            data: {
              name,
              ownerId: user.id,
              address,
              images,
              latitude,
              longitude
            }
          })
          return {
            pub
          }
        } catch (e) {
          handleError(errors.pubAlreadyExists)
        }
      }
    })
    t.field('updatePub', {
      type: 'Pub',

      async resolve(_parent, _args, ctx) {
        return {}
      }
    })
  }
})
