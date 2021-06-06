import { extendType, intArg, nonNull, stringArg } from 'nexus'
import { compare, hash } from 'bcrypt'
import { generateAccessToken, handleError } from '../../utils/helpers'
import { errors, user_status } from '../../utils/constants'

export const user = extendType({
  type: 'Mutation',
  definition(t) {
    t.field('signup', {
      type: 'AuthPayload',
      args: {
        email: nonNull(stringArg()),
        password: nonNull(stringArg()),
        status: stringArg({ default: user_status.client })
      },
      async resolve(_parent, { email, password, status }, ctx) {
        try {
          const hashedPassword = await hash(password, 10)
          const user = await ctx.prisma.user.create({
            data: {
              email,
              password: hashedPassword,
              status
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
  }
})
