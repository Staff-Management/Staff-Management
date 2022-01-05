require('dotenv').config();
const { v4: uuidv4 } = require('uuid');
const user = require("../model/User");
const jwt = require('jsonwebtoken');
const Car = require("../model/Car");
const AWS = require('aws-sdk');
AWS.config.loadFromPath('./aws_config.json');

const s3 = new AWS.S3({apiVersion: '2006-03-01'});
// s3.listBuckets(function(err, data) {
//   if (err) {
//     console.log("Error", err);
//   } else {
//     console.log("Success", data.Buckets);
//   }
// });

// var params = {
//   Bucket: "staff-management", 
//   Key: "avatar/pier.jpg"
//  };

// s3.getObject(params, function(err, data) {
//   if (err)
//     console.log(err, err.stack);
//   else
//   {
//     const buf = Buffer.from(data.Body);
//   }
//  });

//generates JWT Token
const maxAge = 1 * 24 * 60 * 60; //Set the maxage for the jwt token to .24 hours
const createToken = (id) => {
  return jwt.sign({id}, process.env.JWT_SECRET_KEY, {
    expiresIn: maxAge
  });
}
//handling errors 
const handleErrors = (err) =>{
  console.log(err);
  let errors = { email: '', password: '', loginErr: ''};
    
  //duplicate email
  if (err.code === 11000){
    errors.email = 'Email or Username already exists';
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
    resp.cookie('JWT', token, {httpOnly: true, maxAge: maxAge * 1000})
    resp.status(200).json({ user: data });
  }catch (err) {
    const errors = handleErrors(err);
    resp.status(400).json({ errors })
  }
}

module.exports.onBoarding = async (req, resp) => {
  const { email, firstName, lastName, preName, midName, address, cellPhone, workPhone, SSN, DOB, gender, make, model, color, Number, expDate, photo} = req.body;
  try {
    const data1 = await Car.create({  make, model, color });
    try {
      //Use populate to get data for the id of embeded data
      const data = await user.findOneAndUpdate({email}, {firstName, lastName, preName, midName, address, cellPhone, workPhone, SSN, DOB, gender, $push: { carInfo: data1._id} } )
      resp.status(200).json({user: data});
    }catch(e){
      console.log(e);
      resp.status(400).send('Error')
    }
  }catch(e) {
    console.log(e);
    resp.status(400).send('Error')
  }
}

module.exports.setAvatar = async (req, resp) => {
  const { email, image_data } = req.body;
  const file_name = `${uuidv4()}.jpg`
  const buffer = Buffer.from(image_data.replace(/^data:image\/\w+;base64,/, ''), 'base64');
  try {
    const params = {
      Bucket: 'staff-management',
      Key: `avatar/${file_name}`,
      Body: buffer,
    }
    const stored = await s3.upload(params).promise();
    try {
      const data = await user.findOneAndUpdate({ email }, { avatar: `avatar/${file_name}` });
      resp.status(200).json({user: data});
    }
    catch(e) {
      console.log(e);
      resp.status(400).send('Error')
    }
  }
  catch(e) {
    console.log(e);
    resp.status(400).send('Error')
  }
}

module.exports.getAvatar = async (req, resp) => {
  const { email } = req.body;
  try {
    const data = await user.findOne({ email });
    const file_path = data.avatar;
    const params = {
      Bucket: 'staff-management',
      Key: file_path,
    }
    try {
      const img = await s3.getObject(params).promise();
      const base64_str = img.Body.toString('base64');
      resp.status(200).json({ src: base64_str });
    }
    catch(e) {
      console.log(e);
      resp.status(400).send('Error')
    }
  }
  catch(e) {
    console.log(e);
    resp.status(400).send('Error')
  }
}