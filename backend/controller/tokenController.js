require('dotenv').config();

const { v4: uuidv4 } = require('uuid');
const token = require("../model/Token");
const nodemailer = require('nodemailer'); 

const handleErrors = (err) =>{
  console.log("before")
  console.log(err);
  console.log("after");
}

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

module.exports.token = async (req, resp) => {
  const { email } = req.body;
  try {
    const data = await token.findOneAndUpdate({ email: email }, { email: email, token: uuidv4() }, { new: true, upsert: true  });

    const mailOptions = {
      from: process.env.MY_EMAIL,
      to: data.email,
      subject: 'Registration Token',
      text: `Here is your registration token:\n\n ${data.token}\n\nPlease note that this token will expire in 3 hours.`
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
