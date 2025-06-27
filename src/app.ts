import fastity from 'fastify'
import { ZodError } from 'zod'
import { env } from './env'
import { appRoutes } from './http/routes'

export const app = fastity()

app.register(appRoutes)

app.setErrorHandler((error, _, reply) => {
  if (error instanceof ZodError) {
    return reply
    .status(400)
    .send({ message: "Validation error.", issues: error.format() })
  }

  if (env.NODE_ENV !== 'production') {
    console.error(error)
  }else {
    // Log the error to an external service or file in production datalog/newrelic/sentry
  }


  return reply
    .status(500)
    .send({ message: "Internal server error." })

})
