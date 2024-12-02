import { User } from "../db.js"

const pegar_usuario = async (req, res) => {
    /* const id_requisicao = req.params.id
    const usuario = await User.findByPk(id_requisicao)
    if(!usuario) {
        res.status(402).send('id não encontrado')
        return
    }
    res.send(usuario) */
    const { email } = req.params
    const usuario = await User.findOne({ where: { email: email } })
    if(!usuario) {
        res.status(403).send('usuario não encontrado')
        return
    }
    res.status(200).send(usuario)
}

const deletar_usuario = async (req, res) => {
    const { email } = req.params
    const usuario = await User.findOne({where:{email: email}})
    usuario.destroy()
    res.send('usuario deletado com sucesso')
}

const salvar_foto = async (req, res) => {
    const { foto } = req.body
    const { email } = req.params
    try {
        if (!foto) {
            res.status(400).send('o campo deve ser preenchido')
            return
        }
        const usuario = await User.findOne({ where: { email: email } })

        if (!usuario) {
            res.status(404).send('usuario não encontrado')
            return
        }
        await usuario.update({ foto_perfil : foto });
        res.status(200).send('foto salva')
    } catch(error) {
        console.log(error)
        res.status(500).send('erro no servidor')
    }
};

export { pegar_usuario, deletar_usuario, salvar_foto}