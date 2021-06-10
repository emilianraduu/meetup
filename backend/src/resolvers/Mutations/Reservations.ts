import { extendType, intArg, nonNull, stringArg } from 'nexus'
import { findPub, handleError } from '../../utils/helpers'
import { errors } from '../../utils/constants'

export const reservations = extendType({
  type: 'Mutation',
  definition(t) {
    t.field('createReservation', {
      type: 'Reservation',
      args: {
        pubId: nonNull(intArg()),
        tableId: nonNull(intArg()),
        locationId: nonNull(intArg()),
        startHour: nonNull(stringArg()),
        date: nonNull(stringArg()),
        endHour: stringArg()
      },
      async resolve(_parent, { pubId, tableId, locationId, startHour, endHour, date }, ctx) {
        const pub = await findPub(ctx, pubId)
        if (pub) {
          try {
            const reservation = await ctx.prisma.reservation.create({
              data: {
                pubId, tableId, locationId, startHour, endHour, userId: ctx.userId, date
              }
            })
            await ctx.prisma.pub.update({
              where: {id: pubId},
              data: {
                freeTable: pub.freeTable - 1
              }
            })
            return reservation
          } catch (e) {
            handleError(errors.locationNotFound)
          }
        } else {
          handleError(errors.pubNotFound)
        }
      }
    })
  }
})
