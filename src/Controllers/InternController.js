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
        let data = req.query.collegeName
        if (!data) { return res.status(400).send({ status: false, msg: "please give the input" }) }


        let colleged = await CollegeModel.find({ name: data, isDeleted: false })
        if (!colleged) return res.status(400).send({ msg: "College is not in the list " })

        let List1 = colleged[0]._id

        console.log(List1)

        let interned = await InternModel.find({ "collegeId": List1, isDeleted: false })
        if (!interned) return res.status(400).send("college id not exist")
        students = []

        for (let i = 0; i < interned.length; i++) {
            let Object = {}
            Object._id = interned[i]._id
            Object.name = interned[i].name
            Object.email = interned[i].email
            Object.mobile = interned[i].mobile
            students.push(Object)
        }

        const ObjectData = {
            name: colleged[0].name,
            fullName: colleged[0].fullName,
            logoLink: colleged[0].logoLink,
            interest: students
        }

        res.status(201).send({ College_details: ObjectData })
    }
    catch (error) {
        res.status(500).send({ msg: error.message })
    }
}

module.exports.createintern=createintern
module.exports.getinterndetails=getinterndetails