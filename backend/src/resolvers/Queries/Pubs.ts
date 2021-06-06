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

export const getPub = queryField('pub', {
  type: 'Pub',
  args: {
    id: nonNull(intArg())
  },
  async resolve(_parent, { id }, ctx) {
    try {
      return await ctx.prisma.pub.findUnique({
        where: { id },
        include: {
          reviews: true,
          locations: {
            include: {
              tables: {
                include: {
                  reservation: true
                }
              }
            }
          }
        }
      })
    } catch (e) {
      handleError(errors.pubNotFound)
    }
  }
})
