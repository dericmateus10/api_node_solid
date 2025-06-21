import fastity from 'fastify'
import { z } from 'zod'
import { prisma } from './lib/prisma'

export const app = fastity()

app.get('/', async (request, reply) => {
  return reply.status(200).send('Hello World!')
})

app.post('/users', async (request, reply) => {
  const registerBodySchema = z.object({
    name: z.string(),
    email: z.string().email(),
    password: z.string().min(6),
  })

  const { name, email, password } = registerBodySchema.parse(request.body)

  await prisma.user.create({
    data: {
      name,
      email,
      password_hash: password,
    },
  })

  return reply.status(201).send()
})
