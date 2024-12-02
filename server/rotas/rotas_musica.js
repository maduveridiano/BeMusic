import express from 'express'
import { pegarMusicaPorId } from '../controlador/controlador_musica.js';


const rotas_musicas = express.Router();

rotas_musicas.get('/:id', pegarMusicaPorId); 

export {rotas_musicas};