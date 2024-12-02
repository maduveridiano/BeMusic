import Express from 'express';
import { criarTabelas } from './db.js'
import cors from 'cors'
import { rotas_autenticacao } from './rotas/rotas_autenticacao.js';
import { rotas_usuarios } from './rotas/rotas_usuario.js';
import { rotas_artistas } from './rotas/rotas_artista.js';
import { rotas_albums } from './rotas/rotas_album.js';
import { rotas_musicas } from './rotas/rotas_musica.js';


const app = Express()
app.use(Express.json())
app.use(cors())

//criarTabelas() // --> usar so uma vez já que com o 'force: true' ele sempre apaga a tabela existente e cria uma nova do zero

app.use('/autenticacao', rotas_autenticacao ) 
app.use('/usuario', rotas_usuarios)
app.use('/artista', rotas_artistas)
app.use('/album', rotas_albums)
app.use('/musica', rotas_musicas)

app.listen(8000)