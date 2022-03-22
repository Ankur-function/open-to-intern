const InternModel = require("../Models/InternModel")
const CollegeModel = require("../Models/CollegeModel")


const isValid = function (value) {

    if (typeof (value) === 'undefined' || typeof (value) === 'null') {
        return false
    }
    if (value.length == 0) {
        return false
    } if (typeof (value) === 'string' || "Array" && value.length > 0) {
        return true
    }
}

const createintern = async function (req, res) {
    try {
        let intern = req.body
        let mobile2 = intern.mobile
        let id = intern.collegeId
        

        const { name,mobile,email,} = intern

        const req0 = isValid(name)
        if (!req0) return res.status(400).send('name is require')

        const req1 = isValid(mobile)
        if (!req1) return res.status(400).send('mobile require')

        if(mobile.length !=10) return res.status(400).send("invalid mobile number")

        const req2 = isValid(email)
        if (!req2) return res.status(400).send('email require')

        if (!(/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(email))){
            return res.status(400).send("email address is not valid")
        }

        

    let id2 = await CollegeModel.findById(id)
    if(!id2) return res.status(400).send("college is not there in the list")


        let internCreated = await InternModel.create(intern)
    res.status(201).send({status: true, data: internCreated})
} catch (error) {
    res.status(500).send({ status: false, msg: error.message });
}
}


const getinterndetails = async function (req, res) {
    try {
        const data = req.query


        const details = await CollegeModel.findOne({data})
        if (details.length == 0) return res.status(404).send({ status: false, msg: "No details Available." })

        if(!details) return res.status(400).send("your college is not there in the list")

        let clgdetails =  details._id

        let internlist = await InternModel.find({clgdetails})
        res.status(201).send({ msg: details, interest: internlist });
    }


    catch (error) {
        res.status(500).send({ status: false, msg: error.message });
    }
}

module.exports.createintern=createintern
module.exports.getinterndetails=getinterndetails