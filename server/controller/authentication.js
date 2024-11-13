import { User } from '../db'
import bcryptjs from 'bcryptjs'
import jwt from 'jsonwebtoken'

export const cadastro = async (req, res) => {
    try{
        //verificar se os campos estão preenchidos
        const data = req.body
    if(!data.username || !data.email || !data.password|| !data.birthdate){
        res.status(406).send('Preencha todos os campos')
        return
    }
    //verificar se o email já está cadastrado   
    if( await User.findOne({
  where: {
    [Sequelize.Op.or]: [
      { email: data.email },
      { username: data.username }
    ]
  }})){
        res.status(400).send('Pessoa já cadastrada, por favor tente novamente')
        return
    }  
    const encryptPassword = bcryptjs.hashSync(data.password, 15)
    const newUser = User.create({
        username: data.username,
        email: data.email,
        password: encryptPassword,
        birthdate: data.birthdate
    })
    res.status(201).send('Cadastro realizado com sucesso')
    }catch(err){
        console.log(err)
        res.status(500).send('Erro interno')
    }
}

export const login = async  (req, res) => {
    try{
        const data = req.body
        //verificar se os campos estão preenchidos
    if(!(data.username || data.email) || !data.password){
        res.status(406).send('Preencha todos os campos')
        return
    }
    console.log(data)
  const user = await User.findOne({
  where: {
    [Sequelize.Op.or]: [
      { email: data.email },
      { username: data.username }
    ]
  }
})

    if(!user){
        res.status(404).send('Usuário não existe')
        return
    }
    const comparePassword = bcryptjs.compareSync(data.password, user.password)
    if(!comparePassword){
        res.status(401).send('Senha incorreta')
        return
    }
    const token = jwt.sign(
        {
            name: user.username,
            email: user.email|| user.username,
            status: user.status
        },
        'chavedecriptografia',
        {
            expiresIn: '30d'
        }
    )
    res.send({msg:'logado',token})
    }catch(err){
        console.log(err)
        res.status(500).send('Erro interno')
    }
}