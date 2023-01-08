const express = require('express');
const app = express();
const port = 3000;
var user = require('./controllers/user')

app.use(express.json());
app.use(express.urlencoded({extended : false}));

app.post('/user', user.createUser);
app.delete('/user/:id', user.deleteUser);
app.post('/test', user.tesString);

app.use('/', (req, res) => {
    res.status(404).json({message: 'Page Not Found'})
})

app.listen(port, () => {
    console.log('listening on port',port)
})