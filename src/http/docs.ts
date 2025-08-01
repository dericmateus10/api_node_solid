import fastifySwagger, { FastifyDynamicSwaggerOptions } from '@fastify/swagger'
import fastifySwaggerUi from '@fastify/swagger-ui'
import ScalarApiReference from '@scalar/fastify-api-reference'
import { FastifyInstance } from 'fastify'

export async function docsRoutes(app: FastifyInstance) {
  // OpenAPI base config (can be expanded later)
  const swaggerOpts: FastifyDynamicSwaggerOptions = {
    openapi: {
      info: {
        title: 'API Reference',
        description: 'Documentação da API',
        version: '1.0.0',
      },
      servers: [{ url: '/' }],
      components: {},
      tags: [
        { name: 'Auth', description: 'Autenticação e usuários' },
      ],
      paths: {
        '/users': {
          post: {
            tags: ['Auth'],
            summary: 'Registrar usuário',
            requestBody: {
              required: true,
              content: {
                'application/json': {
                  schema: {
                    type: 'object',
                    properties: {
                      name: { type: 'string' },
                      email: { type: 'string', format: 'email' },
                      password: { type: 'string', format: 'password' },
                    },
                    required: ['name', 'email', 'password'],
                  },
                },
              },
            },
            responses: {
              '201': {
                description: 'Usuário criado',
              },
              '400': {
                description: 'Erro de validação',
              },
              '409': {
                description: 'Usuário já existe',
              },
            },
          },
        },
        '/sessions': {
          post: {
            tags: ['Auth'],
            summary: 'Autenticar usuário',
            requestBody: {
              required: true,
              content: {
                'application/json': {
                  schema: {
                    type: 'object',
                    properties: {
                      email: { type: 'string', format: 'email' },
                      password: { type: 'string', format: 'password' },
                    },
                    required: ['email', 'password'],
                  },
                },
              },
            },
            responses: {
              '200': {
                description: 'Autenticado',
              },
              '400': {
                description: 'Erro de validação',
              },
              '401': {
                description: 'Credenciais inválidas',
              },
            },
          },
        },
      },
    },
  }

  // Register Swagger (serves the spec and exposes /openapi.json)
  await app.register(fastifySwagger, swaggerOpts)

  // Scalar API Reference at /docs (requires fastify-swagger to be registered)
  await app.register(ScalarApiReference, {
    routePrefix: '/docs',
    configuration: {
      spec: { content: app.swagger() },
      theme: 'default',
      layout: 'classic',
    },
  })

  // Swagger UI at /swagger
  await app.register(fastifySwaggerUi, {
    routePrefix: '/swagger',
    uiConfig: {
      docExpansion: 'list',
      deepLinking: true,
    },
  })

  // Expose raw OpenAPI JSON
  app.get('/openapi.json', async () => app.swagger())
}
