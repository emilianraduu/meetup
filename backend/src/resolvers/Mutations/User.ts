import { extendType, intArg, nonNull, stringArg } from 'nexus'
import { compare, hash } from 'bcrypt'
import { findPub, generateAccessToken, handleError } from '../../utils/helpers'
import { errors, user_status } from '../../utils/constants'

export const user = extendType({
  type: 'Mutation',
  definition(t) {
    t.field('signup', {
      type: 'AuthPayload',
      args: {
        email: nonNull(stringArg()),
        password: nonNull(stringArg()),
        status: stringArg({ default: user_status.client }),
        firstName: stringArg(),
        lastName: stringArg()
      },
      async resolve(_parent, { email, password, status, firstName, lastName }, ctx) {
        try {
          const hashedPassword = await hash(password, 10)
          const user = await ctx.prisma.user.create({
            data: {
              email,
              password: hashedPassword,
              status,
              firstName,
              lastName
            }
          })
          const accessToken = generateAccessToken(user.id)
          return {
            accessToken,
            user
          }
        } catch (e) {
          handleError(errors.userAlreadyExists)
        }
      }
    })
    t.field('login', {
      type: 'AuthPayload',
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
    t.field('updateUser', {
      type: 'User',
      args: {
        firstName: stringArg(),
        lastName: stringArg(),
        photo: stringArg(),
        id: nonNull(intArg()),
        maxDistance: intArg()
      },
      async resolve(_parent, { firstName, lastName, photo, id, maxDistance }, ctx) {
        try {
          return await ctx.prisma.user.update({
            where: { id },
            data: {
              firstName,
              lastName,
              maxDistance,
              photo
            }
          })
        } catch (e) {
          console.log(e)
        }
      }
    })
    t.field('createWaiter', {
      type: 'User',
      args: {
        email: nonNull(stringArg()),
        pubId: nonNull(intArg())
      },
      async resolve(_parent, { email, pubId }, ctx) {
        try {
          const user = await ctx.prisma.user.findUnique({
            where: { email }
          })
          if (!user) {
            return await ctx.prisma.user.create({
              data: {
                email,
                status: user_status.waiter,
                pubId
              }
            })
          } else {
            return await ctx.prisma.user.update({
              where: { id: user.id },
              data: {
                status: user_status.waiter,
                pubId
              }
            })
          }
        } catch (e) {
          handleError(errors.userAlreadyExists)
        }
      }
    })
    t.field('deleteWaiter', {
      type: 'User',
      args: {
        id: nonNull(intArg()),
        pubId: nonNull(intArg())
      },
      async resolve(_parent, { id, pubId }, ctx) {
        try {
          const pub = await findPub(ctx, pubId)
          if (pub?.ownerId === ctx.userId) {
            return await ctx.prisma.user.delete({
              where: { id }
            })
          }
        } catch (e) {
          handleError(errors.userAlreadyExists)
        }
      }
    })
  }
})
