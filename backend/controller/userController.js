const user = require("../model/User");
const jwt = require('jsonwebtoken');

//generates JWT Token 
const maxAge = 1 * 24 * 60 * 60; //Set the maxage for the jwt token to .24 hours
const createToken = (id) => {
    return jwt.sign({id}, 'secret key', {
        expiresIn: maxAge
    });
}

module.exports.register = async (req, resp) => {
    const { email, password} = req.body; 
    try {
        const data = await user.create({ email, password});
        const token = createToken(data._id);
        resp.cookie('JWT', token, {httpOnly: true, maxAge: maxAge * 1000})
        resp.status(201).json({user: data._id})
        resp.send('Created User');
    }
    catch(err) {
        handleErr(err);
        resp.send();
    }
}

module.exports.login = async (req, resp) => {
    const { email, password } = req.body;
    try {
        const data = await user.login(email, password);
        const token = createToken(data._id);
        //changes the JWT token to expire after 1 day.
        resp.cookie('jwt', token, {httpOnly: true, maxAge: maxAge * 1000})
        resp.status(200).json({user: data._id});
        resp.send('Login In')
    }catch (err) {
        console.log(err);
        resp.status(400);
    }
}

