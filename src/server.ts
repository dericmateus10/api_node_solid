import { app } from './app'
import { env } from './env'

app.get('/', (req, res) => {
  return res.send('Hello World!')
})

app
  .listen({
    host: '0.0.0.0', // Listen on all interfaces accessible from the network
    port: env.PORT,
  })
  .then(() => {
    console.log('🚀Server is running on http://localhost:3333')
  })
