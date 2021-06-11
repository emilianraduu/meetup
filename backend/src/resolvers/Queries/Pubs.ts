import { floatArg, intArg, nonNull, queryField } from 'nexus'
import { getDistance } from 'geolib'
import { errors } from '../../utils/constants'
import { Pub } from '.prisma/client'
import { handleError } from '../../utils/helpers'

export const getPubs = queryField('pubs', {
  type: 'Pub',
  list: true,
  args: {
    latitude: nonNull(floatArg()),
    longitude: nonNull(floatArg())
  },
  async resolve(_parent, { latitude, longitude }, ctx) {
    try {
      const pubs = await ctx.prisma.pub.findMany()
      const user = await ctx.prisma.user.findUnique(
        { where: { id: ctx.userId } }
      )
      const newPubs: Pub[] | PromiseLike<Pub[]> = []
      pubs.forEach((pub) => {
        const distance = getDistance({ latitude, longitude }, { latitude: pub.latitude, longitude: pub.longitude })
        if (user && distance < user.maxDistance) {
          newPubs.push({ ...pub, distance })
        }
      })
      return newPubs
    } catch (e) {
      handleError(errors.invalidUser)
    }
  }
})


export const getMyPubs = queryField('myPubs', {
  type: 'Pub',
  list: true,
  async resolve(_parent, _args, ctx) {
    try {
      return await ctx.prisma.pub.findMany({
        where: { ownerId: ctx.userId }
      })
    } catch (e) {
      handleError(errors.invalidUser)
    }
  }
})

export const getPub = queryField('pub', {
  type: 'Pub',
  args: {
    id: nonNull(intArg()),
    latitude: floatArg(),
    longitude: floatArg()
  },
  async resolve(_parent, { id, latitude, longitude }, ctx) {
    try {
      const pub = await ctx.prisma.pub.findUnique({
        where: { id },
        include: {
          reviews: {
            include: {
              user: true
            }
          },
          menu: {
            include: {
              sections: {
                include: {
                  items: true
                }
              }
            }
          },
          locations: {
            include: {
              tables: {
                include: {
                  reservations: true
                }
              }
            }
          },
          waiters: true
        }
      })
      const distance = latitude && longitude && getDistance({ latitude, longitude }, { latitude: pub.latitude, longitude: pub.longitude })

      return { ...pub, distance }
    } catch (e) {
      handleError(errors.pubNotFound)
    }
  }
})
