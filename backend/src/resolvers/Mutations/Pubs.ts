import { extendType, nonNull, stringArg } from 'nexus'
import { compare, hash } from 'bcrypt'
import { generateAccessToken, handleError } from '../../utils/helpers'
import { errors } from '../../utils/constants'

export const pub = extendType({
  type: 'Mutation',
  definition(t) {
    t.field('createPub', {
      type: 'Pub',
      async resolve(_parent, _args, ctx) {
        try {
          const pub = await ctx.prisma.pub.create({data: {name: "123", address: "1243", images: "123", ownerId: 1, latitude: 1, longitude: 2}})
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
      args: {
        email: nonNull(stringArg()),
        password: nonNull(stringArg())
      },
      async resolve(_parent, { email, password }, ctx) {
        let user = null
        try {
          user = await ctx.prisma.user.findUnique({
            where: {
              email
            }
          })
        } catch (e) {
          handleError(errors.invalidUser)
        }

        if (!user) handleError(errors.invalidUser)

        const passwordValid = await compare(password, user.password)
        if (!passwordValid) handleError(errors.invalidUser)
        const accessToken = generateAccessToken(user.id)
        return {
          accessToken,
          user
        }
      }
    })
  }
})
