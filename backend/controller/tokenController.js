require('dotenv').config();

const { v4: uuidv4 } = require('uuid');
const token = require("../model/Token");
const nodemailer = require('nodemailer'); 

const handleErrors = (err) =>{
  console.log("before")
  console.log(err);
  console.log("after");
}

module.exports.token = async (req, resp) => {
  const { email } = req.body;
  try {
    const data = await token.findOneAndUpdate({ email: email }, { email: email, token: uuidv4() }, { new: true, upsert: true  });

    const transporter = nodemailer.createTransport({
      host: 'smtp.gmail.com',
      port: 587,
      secure: false,
      requireTLS: true,
      auth: {
        type: 'OAuth2',
        user: process.env.MY_EMAIL,
        clientId: process.env.OAUTH2_CLIENT_ID,
        clientSecret: process.env.OAUTH2_CLIENT_SECRET,
        refreshToken: process.env.REFRESH_TOKEN,
        accessToken: process.env.ACCESS_TOKEN,
      }
    });

    const mailOptions = {
      from: process.env.MY_EMAIL,
      to: data.email,
      subject: 'Registration Token',
      text: `Please follow this link to register your account:
        \n\n http://localhost:3000/signup?token=${data.token} \n\n
        Please note that this token will expire in 3 hours.`
    };

    transporter.sendMail(mailOptions, function(error, info){
      if (error) {
        console.log(error);
      } else {
        console.log('Email sent: ' + info.response);
      }
    });

    resp.status(200).json({ response: data });
  }catch (err) {
    const errors = handleErrors(err);
    resp.status(400).json({ errors })
  }
}

module.exports.check = async (req, resp) => {
  const { reg_token } = req.body;
  try {
    const data = await token.check(reg_token);
    //changes the JWT token to expire after 1 day.
    resp.status(200).json({ email: data.email });
  }catch (err) {
    const errors = handleErrors(err);
    resp.status(400).json({ errors })
  }
}
