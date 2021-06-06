import { extendType, intArg, nonNull, stringArg } from 'nexus'
import { findPub, handleError } from '../../utils/helpers'
import { errors } from '../../utils/constants'

export const locations = extendType({
  type: 'Mutation',
  definition(t) {
    t.field('createTable', {
      type: 'Location',
      args: {
        pubId: nonNull(intArg()),
        name: nonNull(stringArg())
      },
      async resolve(_parent, { pubId, name }, ctx) {
        if (await findPub(ctx, pubId)) {
          try {
            return await ctx.prisma.location.create({
              data: {
                pubId,
                name
              }
            })
          } catch (e) {
            handleError(errors.locationNotFound)
          }
        } else {
          handleError(errors.pubNotFound)
        }
      }
    })
    t.field('updateSchedule', {
      type: 'Schedule',
      args: {
        dayOfWeek: stringArg(),
        timeStart: stringArg(),
        timeEnd: stringArg(),
        pubId: nonNull(intArg()),
        id: nonNull(intArg())
      },
      async resolve(_parent, { id, pubId, dayOfWeek, timeStart, timeEnd }, ctx) {
        if (await findPub(ctx, pubId)) {
          try {
            return await ctx.prisma.schedule.update({
              where: { id },
              data: {
                dayOfWeek,
                timeStart,
                timeEnd
              }
            })
          } catch (e) {
            handleError(errors.scheduleAlreadyExists)
          }
        } else {
          handleError(errors.pubNotFound)
        }
      }
    })
  }
})
