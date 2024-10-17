import Express from 'express'

const app = Express()

app.get('/pegar', (req, res) => {
    res.send('Hello World!')
})




app.listen(3000)