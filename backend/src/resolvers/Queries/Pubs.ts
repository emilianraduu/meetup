import { nonNull, queryField, stringArg } from 'nexus'

export const getPubs = queryField('pubs', {
  type: 'Pubs',
  list: true,
  args: {
    latitude: nonNull(stringArg()),
    longitude: nonNull(stringArg())
  },
  async resolve(_parent, {latitude, longitude}, ctx) {
    console.log(latitude, longitude)
    return await ctx.prisma.pub.findMany()
  }
})
