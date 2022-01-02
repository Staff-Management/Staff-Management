const user = require("../model/User");
const jwt = require('jsonwebtoken');

//generates JWT Token 
const maxAge = 1 * 24 * 60 * 60; //Set the maxage for the jwt token to .24 hours
const createToken = (id) => {
    return jwt.sign({id}, 'secret key', {
        expiresIn: maxAge
    });
}
//handling errors 
const handleErrors = (err) =>{
    console.log(err.message, err.code);
    let errors = { email: '', password: '', loginErr: ''};
    
    //duplicate email
    if (err.code === 11000){
        errors.email = 'Email already exists';
        return errors;
    }

    //Errors thrown during login
    if (err.message === 'email or password is wrong!') {
        errors.loginErr = 'email or password is wrong!'
        return errors;
    }

    //validation errors
    if (err.message.includes('User validation failed')){
        Object.values(err.errors).forEach(error => {
            // console.log(error.properties);
            errors[error['properties'].path] = error['properties'].message
        })
    }
    return errors
}

module.exports.register = async (req, resp) => {
    const { username, email, password} = req.body; 
    try {
        const data = await user.create({ username, email, password});
        const token = createToken(data._id);
        resp.cookie('JWT', token, {httpOnly: true, maxAge: maxAge * 1000})
        resp.status(201).json({user: data._id})
    }
    catch(err) {
        const errors = handleErrors(err);
        resp.status(400).json({ errors })
    }
}

module.exports.login = async (req, resp) => {
    const { account, password } = req.body;
    try {
        const data = await user.login(account, password);
        const token = createToken(data._id);
        //changes the JWT token to expire after 1 day.
        resp.cookie('jwt', token, {httpOnly: true, maxAge: maxAge * 1000})
        resp.status(200).json({user: data._id});
    }catch (err) {
        const errors = handleErrors(err);
        resp.status(400).json({ errors })
    }
}

