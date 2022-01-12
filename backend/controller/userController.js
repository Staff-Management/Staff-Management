require('dotenv').config();
const jwt = require('jsonwebtoken');
const User = require("../model/User");
const Car = require("../model/Car");
const EmergencyContact = require("../model/EmergencyContact");
const DriverLicense = require("../model/DriverLicense");
const Reference = require("../model/Reference");
const WorkAuth = require("../model/WorkAuth");
const Address = require('../model/Address');
const Notification = require('../model/Notification');

//generates JWT Token
const maxAge = 1 * 24 * 60 * 60;
const createToken = (id) => {
  return jwt.sign({ id }, process.env.JWT_SECRET_KEY, {
    expiresIn: maxAge
  });
}
//handling errors 
const handleErrors = (err) => {
  console.log(err);
  let errors = { email: '', password: '', loginErr: '' };

  //duplicate email
  if (err.code === 11000) {
    errors.email = 'Email or Username already exists';
    return errors;
  }

  //Errors thrown during login
  if (err.message === 'email or password is wrong!') {
    errors.loginErr = 'email or password is wrong!'
    return errors;
  }

  //validation errors
  if (err.message.includes('User validation failed')) {
    Object.values(err.errors).forEach(error => {
      errors[error['properties'].path] = error['properties'].message
    })
  }
  return errors
}

module.exports.register = async (req, resp) => {
  const { username, email, password } = req.body;
  try {
    const data = await User.create({ username, email, password });
    const token = createToken(data._id);
    resp.cookie('JWT', token, { httpOnly: true, maxAge: maxAge * 1000 })
    resp.status(201).json({ user: data._id })
  }
  catch (err) {
    const errors = handleErrors(err);
    resp.status(400).json({ errors })
  }
}

module.exports.login = async (req, resp) => {
  const { account, password } = req.body;
  try {
    const data = await User.login(account, password);
    const token = createToken(data._id);
    //changes the JWT token to expire after 1 day.
    resp.cookie('JWT', token, { httpOnly: true, maxAge: maxAge * 1000 })
    resp.status(200).json({ user: data });
  } catch (err) {
    const errors = handleErrors(err);
    resp.status(400).json({ errors })
  }
}

module.exports.onBoarding = async (req, resp) => {
  const { email, all_info, em_contact } = req.body;
  const {
    firstName,
    lastName,
    preferredName,
    middleName,
    address1,
    address2,
    city,
    state,
    zip,
    country,
    cell_phone,
    work_phone,
    ssn,
    birthday,
    gender,
    vehicle_maker,
    vehicle_model,
    vehicle_color,
    driverLicense_own,
    driverLicense_num,
    driverLicense_exp,
    driverLicense_filename,
    ref_firstname,
    ref_lastname,
    ref_middlename,
    ref_email,
    ref_phone,
    ref_relationship,
    ref_address1,
    ref_city,
    ref_state,
    ref_zip,
    ref_country,
    work_auth,
    perm_citizen,
    green_card_citizen,
    other_work_auth,
    workAuth_filename,
    workAuth_start,
    workAuth_exp
  } = all_info
  try {
    let emergency_id = [];
    const car_info = await Car.create({ vehicle_maker, vehicle_model, vehicle_color });
    const address_info = await Address.create({ address1, address2, city, state, zip, country });
    const dl_info = await DriverLicense.create({ driverLicense_num, driverLicense_exp });
    const ref_info = await Reference.create({ ref_firstname, ref_middlename, ref_lastname, ref_address1, ref_city, ref_state, ref_country, ref_zip, ref_phone, ref_email, ref_relationship });
    const work_auth_info = await WorkAuth.create({ work_auth, other_work_auth, workAuth_start, workAuth_exp });
    for (const contact of em_contact) {
      const emergency = await EmergencyContact.create(contact);
      emergency_id.push(emergency._id);
    }
    try {
      const data = await User.findOneAndUpdate({ email }, {
        firstName, lastName, preferredName, middleName, cell_phone, work_phone, ssn, birthday, gender, green_card_citizen, perm_citizen, driverLicense_own, driverLicense_filename, workAuth_filename, car_info: car_info._id,
        dl_info: dl_info._id, ref_info: ref_info._id, work_auth_info: work_auth_info._id, address_info: address_info._id, $push: { emergency_contact_info: { $each: emergency_id } }
      })
      resp.status(200).json({ user: data });
    } catch (e) {
      console.log(e);
      resp.status(400).send('Error in the inner try')
    }
  } catch (e) {
    console.log(e);
    resp.status(400).send('Error in the outer try')
  }
}

module.exports.getUser = async (req, resp) => {
  const { email } = req.body;
  try {
    const data = await User.findOne({ email }).populate('work_auth_info');
    resp.status(200).json({ user: data });
  } catch (err) {
    const errors = handleErrors(err);
    resp.status(400).json({ errors })
  }
}

module.exports.getEmployees = async (req, resp) => {
  try {
    const data = await User.find({ role: 'employee' }).populate('work_auth_info').populate('address_info').populate('car_info').populate('ref_info').populate('emergency_contact_info').populate('dl_info');
    resp.status(200).json({ users: data });
  } catch (err) {
    const errors = handleErrors(err);
    resp.status(400).json({ errors })
  }
}

module.exports.updateProfile = async (req, resp) => {
  const { email, firstName, lastName, preferredName, birthday, gender, ssn } = req.body;
  try {
    const data = await User.findOneAndUpdate({ email }, { firstName, lastName, preferredName, birthday, gender, ssn })
    resp.status(200).json({ data })
  } catch (e) {
    console.log(e);
    resp.status(400).send('Error in the outer try')
  }
}

// module.exports.updateDriv = async (req, resp) => {
//   const { email, number, expDate, photo} = req.body;
//   try {
//       const data = await User.findOne({email})
//       const dataId = data.driverLicense;
//       try {
//           const dl = await License.findByIdAndUpdate(dataId, { number, expDate, photo })
//           resp.status(200).json({user: data});
//       }catch(e){
//           console.log(e);
//           resp.status(400).send('Error in the inner try')
//       }
//   }catch(e) {
//       console.log(e);
//       resp.status(400).send('Error in the outer try')
//   }
// }

// module.exports.updateAddress = async (req, resp) => {
//   const { email, address1, address2, city, state, zipCode } = req.body;
//   try {
//       const data = await User.findOne({email})
//       const dataId = data.address;
//       try {
//           const dl = await EmAddress.findByIdAndUpdate(dataId, { address1, address2, city, state, zipCode })
//           resp.status(200).json({user: data});
//       }catch(e){
//           console.log(e);
//           resp.status(400).send('Error in the inner try')
//       }
//   }catch(e) {
//       console.log(e);
//       resp.status(400).send('Error in the outer try')
//   }
// }

// module.exports.updateRef = async (req, resp) => {
//   const { email, refFirstName, refSecondName, refMidName, refEmail, refRelationship} = req.body;
//   try {
//       const data = await User.findOne({email})
//       const dataId = data.reference;
//       try {
//           const dl = await Reference.findByIdAndUpdate(dataId, { refFirstName, refSecondName, refMidName, refEmail, refRelationship })
//           resp.status(200).json({user: data});
//       }catch(e){
//           console.log(e);
//           resp.status(400).send('Error in the inner try')
//       }
//   }catch(e) {
//       console.log(e);
//       resp.status(400).send('Error in the outer try')
//   }
// }

// module.exports.updateWorkAuth = async (req, resp) => {
//   const { email, visa, workPhoto, startDate, endDate} = req.body;
//   try {
//       const data = await User.findOne({email})
//       const dataId = data.workAuth;
//       try {
//           const dl = await WorkAuth.findByIdAndUpdate(dataId, { visa, workPhoto, startDate, endDate })
//           resp.status(200).json({user: data});
//       }catch(e){
//           console.log(e);
//           resp.status(400).send('Error in the inner try')
//       }
//   }catch(e) {
//       console.log(e);
//       resp.status(400).send('Error in the outer try')
//   }
// }

// module.exports.updateCar = async (req, resp) => {
//   const { email, make, model, color } = req.body;
//   try {
//       const addCar = await Car.create({ make, model, color });
//       const data = await User.findOneAndUpdate({email}, { $push: {carInfo: addCar._id} } )
//       resp.status(200).json({ data })
//   }catch(e) {
//       console.log(e);
//       resp.status(400).send('Error in the outer try')
//   }
// }

// module.exports.updateContact = async (req, resp) => {
//   const { email, emFirstName, emSecondName, emMidName, emEmail, emRelationship } = req.body;
//   try {
//       const addContact = await EmContact.create({ emFirstName, emSecondName, emMidName, emEmail, emRelationship });
//       const data = await User.findOneAndUpdate({email}, { $push: {EmergencyContact: addContact._id} } )
//       resp.status(200).json({ data })
//   }catch(e) {
//       console.log(e);
//       resp.status(400).send('Error in the outer try')
//   }
// }

module.exports.sendNotification = async (req, resp) => {
  const { from_email, to_email, message } = req.body;
  try {
    const data = await Notification.create({ from_email, to_email, message, date: Date.now().toString() });
    resp.status(200).json({ notification: data })
    if (message === 'Your application is approved!') {
      try {
        const data = await User.findOneAndUpdate({ email: to_email }, { application_approved: true })
      }
      catch (e) {
        console.log(e);
        resp.status(400).send('Error')
      }
    }
  }
  catch (e) {
    console.log(e);
    resp.status(400).send('Error')
  }
}

module.exports.getNotification = async (req, resp) => {
  const { email } = req.body;
  try {
    const data = await Notification.find({ to_email: email });
    resp.status(200).json({ notification: data })
  }
  catch (e) {
    console.log(e);
    resp.status(400).send('Error')
  }
}

module.exports.deleteNotification = async (req, resp) => {
  const { id } = req.body;
  try {
    const data = await Notification.findByIdAndDelete(id);
    resp.status(200).json({ notification: data })
  }
  catch (e) {
    console.log(e);
    resp.status(400).send('Error')
  }
}