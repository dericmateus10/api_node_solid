import fastity from 'fastify'
import { PrismaClient } from 'generated/prisma'

export const app = fastity()

const prisma = new PrismaClient()

prisma.user.create({
  data: {
    name: 'Deric Mateus',
    email: 'dericmateus10@gmail.com',
  },
})
