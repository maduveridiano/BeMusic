import Express from 'express'

const app = Express()
app.use(Express.json())


app.get('/login', (req, res) => {
    res.send('Hello World!')
})

app.post('/cadastro', (req, res) => {
    try{
        //verificar se os campos estão preenchidos
        const data = req.body
    if(!data.username || !data.email || !data.password|| !data.birthdate){
        res.status(406).send('Preencha todos os campos')
        return
    }
    res.status(201).send('Cadastro realizado com sucesso')
    }catch(err){
        console.log(err)
    }
})


app.listen(3000)