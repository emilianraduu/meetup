import { withFilter } from 'apollo-server'
import { subscriptionField, stringArg, nonNull } from 'nexus'

export const reserveTable = subscriptionField('newTable', {
  type: 'Table',
  args: {
    tableId: nonNull(stringArg()),
  },
  subscribe: withFilter(
    (_root, _args, ctx) => ctx.pubsub.asyncIterator('newTable'),
    (payload, { roomId }) => {
      console.log('aici')
      return payload.roomId === roomId
    }
  ),
  resolve: (payload) => payload,
})
