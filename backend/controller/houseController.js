const House = require('../model/House');
const facilityReports = require('../model/FacilityReports');
const Facility = require('../model/Facility');
const Tenants = require('../model/Tenants');

module.exports.addHouse = async (req, resp) => {
    const {
        landLord,
        landlordEmail,
        landLordPhone,
        address1,
        address2,
        city,
        numEmployees,
        state,
        zip,
        numBeds,
        numMattress,
        numTables,
        numChairs,
        tenantsList
    } = req.body;
    try {
        let tenants_id = [];
        if(tenantsList[0].firstName) {
            for (const tenants of tenantsList) {
            const createTenants = await Tenants.create(tenants);
            tenants_id.push(createTenants._id);
            }
        }
        const createFacility = await Facility.create({ numBeds, numMattress, numTables, numChairs });
        const createHouse = await House.create({ landLord, landlordEmail, landLordPhone, address1, address2, city, numEmployees, state, zip, facilityInfo: createFacility._id })
        if(tenantsList[0].firstName){
            const updateHouse = await House.findOneAndUpdate({ landLord }, { $push: { list_employee: { $each: tenants_id } } })
        }
        resp.status(200).json({ house: createHouse });
    } catch (e) {
        console.log(e);
        resp.status(200).send('error')
    }
    resp.end();
}

module.exports.addTenants = async (req, resp) => {
    const {
        landLord,
        preferredName,
        firstName,
        tenantsPhone,
    } = req.body;
    console.log(req.body);
    try {
        const createTenants = await Tenants.create({ preferredName, firstName, tenantsPhone });
        const updateHouse = await House.findOneAndUpdate({ landLord }, { $push: { list_employee: createTenants._id } })
        resp.status(200).json({ house: updateHouse });
    } catch (e) {
        console.log(e);
        resp.status(200).send('error')
    }
}

module.exports.updateFacility = async (req, resp) => {
    const { landLord, numBeds, numMattress, numTables, numChairs } = req.body;
    try {
        const data = await House.findOne({ landLord })
        console.log(data)
        const dataId = data.facilityInfo;
        try {
            const dl = await Facility.findByIdAndUpdate(dataId, { numBeds, numMattress, numTables, numChairs })
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

module.exports.updateHouse = async (req, resp) => {
    const { landLord, email, landLordPhone, address1, address2, city, numEmployees, state, zip } = req.body;
    console.log(req.body);
    try {
        const data = await House.findOneAndUpdate({ landLord }, { email, landLordPhone, address1, address2, city, numEmployees, state, zip })
        resp.status(200).json({ data })
    } catch (e) {
        console.log(e);
        resp.status(400).send('Error in the outer try')
    }
}

module.exports.getHouse = async (req, resp) => {
    try {  
        const res = await House.find()
        resp.status(200).json({ res })
    }catch(e){
        resp.status(400).send('Error')
    }
}

module.exports.getLandLord = async (req, resp) => {
    const { landLord } = req.params
    console.log(landLord);
    try {  
        const res = await House.findOne({ landLord }).populate("facilityInfo").populate("list_employee")
        resp.status(200).json({ res })
    }catch(e){
        resp.status(400).send('Error')
    }
}