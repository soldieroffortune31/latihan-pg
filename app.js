const express = require('express');
const app = express();
const port = 3000;
var user = require('./controllers/user');
var pesantren = require('./controllers/latihanAxios');
var token = require('./controllers/token')

app.use(express.json());
app.use(express.urlencoded({extended : false}));

app.post('/token', token.getToken);
app.get('/check', token.check);
app.get('/verify', token.enkripsiConsId);

app.post('/user', user.createUser);
app.delete('/user/:id', user.deleteUser);
app.get('/user', user.getUsers);
app.get('/user/:id', user.getUserByID);

app.get('/pesantren', pesantren.getData);
// app.post('/test', user.tesString);

app.use('/', (req, res) => {
    res.status(404).json({message: 'Page Not Found'})
})

app.listen(port, () => {
    console.log('listening on port',port)
})