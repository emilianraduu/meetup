import { intArg, nonNull, queryField } from 'nexus'

export const getPubs = queryField('pubs', {
  type: 'Pub',
  list: true,
  args: {
    latitude: nonNull(intArg()),
    longitude: nonNull(intArg())
  },
  async resolve(_parent, {latitude, longitude}, ctx) {
    console.log(latitude, longitude)
    return await ctx.prisma.pub.findMany()
  }
})
