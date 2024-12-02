import Express from "express";
import { deletar_usuario, pegar_usuario, salvar_foto } from "../controlador/controlador_usuario.js";

const rotas_usuarios = Express.Router()

rotas_usuarios.get('/:email', pegar_usuario)
rotas_usuarios.delete('/:email/deletar_usuario', deletar_usuario)
rotas_usuarios.post('/:email/salvar_foto', salvar_foto)

export { rotas_usuarios }