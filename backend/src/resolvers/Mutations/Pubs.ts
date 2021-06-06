import { extendType, intArg, nonNull, stringArg } from 'nexus'
import { findUser, handleError } from '../../utils/helpers'
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
        const user = await findUser(ctx)
        if(user?.status === user_status.admin) {
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
            console.log(pub)
            return pub

          } catch (e) {
            handleError(errors.pubAlreadyExists)
          }
        } else {
          handleError(errors.invalidUser)
        }
      }
    })
    // t.field('updatePub', {
    //   type: 'Pub',
    //
    //   async resolve(_parent, _args, ctx) {
    //     return {}
    //   }
    // })
  }
})
