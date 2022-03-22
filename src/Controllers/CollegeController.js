const CollegeModel = require("../Models/CollegeModel")
const InternModel = require("../Models/InternModel")

const isValid = function (value) {

    if (typeof (value) === 'undefined' || typeof (value) === 'null') {
        return false
    }
    if (value.length == 0) {
        return false
    } if (typeof (value) === 'string' || "Array" || URL && value.length > 0) {
        return true
    }
}


const createcollege = async function (req, res) {
    try {
        let data = req.body

        const { name, fullName, logoLink } = data

        const req0 = isValid(name)
        if (!req0) return res.status(400).send('name is require')

        const req1 = isValid(fullName)
        if (!req1) return res.status(400).send('fullName require')

        const req2 = isValid(logoLink)
        if (!req2) return res.status(400).send('logoLink require')

        
          let collegeCreated = await CollegeModel.create(data)
         res.status(201).send({status: true,data: collegeCreated})
     } catch (error) {
     res.status(500).send({ status: false, msg: error.message });
   }
 }




module.exports.createcollege=createcollege
