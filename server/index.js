import Express from 'express'
import router_auth from './routes/route_auth.js'

const app = Express()
app.use(Express.json())

app.use('/auth', router_auth)
app.use('/user', router_usuario)

app.listen(3000)