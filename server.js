require('dotenv').config();

const express = require('express');
const app = express();
const jwt = require('jsonwebtoken');
// const bcrypt = require('bcrypt');

app.use(express.json());

const users = [{
        username: 'Erika',
        password: 'Something 1'
    },
    {
        username: 'Jess',
        password: 'Something 2'
    }
];

app.get('/users', authenticateToken, (req, res) => {
    res.json(users.filter(
        post => post.username === req.user.name
    ))
});

function authenticateToken(req, res, next) {

    const authHeader = req.headers['authorization']
    const token = authHeader && authHeader.split(' ')[1]

    if (token == null) 
    return res.sendStatus(401)

    jwt.verify(token, process.env.ACCESS_TOKEN_SECRET, (error, user) => {

        console.log(error)

        if (error) 
        return res.sendStatus(403)
        
        req.user = user
        
        next()
    })
};

app.listen(3000);