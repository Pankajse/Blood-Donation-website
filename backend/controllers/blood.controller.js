const RequestBloodModel = require("../models/requestBlood.model");
const bloodServices = require("../services/blood.service");

module.exports.donateBloodform = async(req,res)=>{
    try{
        const user = req.user;
        const {bloodType,healthStatus,availability,homeAddress,contactNumber,weight,age} = req.body;
        const donateForm = await bloodServices.donateBloodForm({user : user._id,bloodType,healthStatus,homeAddress,contactNumber,availability,weight,age});
        if(!donateForm){
            return res.status(400).json({message : "Form not Submitted"});
        }
        return res.status(200).json({message : "Form Successfully Submitted", donateForm});
    }catch(error){
        console.log(error);
        return res.status(500).json({message : "Internal Server Error"});
    }
}

module.exports.requestBloodform = async(req,res)=>{
    try{
        const user = req.user;
        const {bloodType,amount,address,contact,cause,status} = req.body;
        const requestForm = await bloodServices.requestBloodForm({user : user._id,bloodType,amount,address,contact,cause,status});
        if(!requestForm){
            return res.status(400).json({message : "Request blood form not submited"})
        }

        return res.status(200).json({message : "Request blood form Submitted", requestForm})
    }catch(error){
        console.log(error)
        return res.status(500).json({message : "Internal Server Error",error});
    }
}

module.exports.nearbydonorsOrgs = async(req,res)=>{
    const user = req.user;
    try {
        const requestBloodForm = await RequestBloodModel.findOne({userId : user._id});
        if(!requestBloodForm){
            return res.status(400).json({message : "Request blood form not found"})
        }
        const nearbyDonors = await bloodServices.nearbyDonors(requestBloodForm.location);

        const nearbyOrgs = await bloodServices.nearbyOrgs(requestBloodForm.location);
        return res.status(200).json({message : "Nearby donors found", nearbyDonors,nearbyOrgs});
    } catch (error) {
        console.log(error)
        return res.status(500).json({message : "Internal Server Error",error});
    }
}

module.exports.nearbydonorsOrgsByBloodType = async (req, res) => {
    const user = req.user;
    try {
        const requestBloodForm = await RequestBloodModel.findOne({ user : user._id });
        if (!requestBloodForm) {
            return res.status(400).json({ message: "Request blood form not found" });
        }
        const bloodType = requestBloodForm.bloodType;
        const nearbyDonors = await bloodServices.nearbyDonorsByBloodType(requestBloodForm.location, bloodType);
        const nearbyOrgs = await bloodServices.nearbyOrgsByBloodType(requestBloodForm.location, bloodType);
        return res.status(200).json({ message: "Nearby donors and organizations found", nearbyDonors, nearbyOrgs });
    } catch (error) {
        console.log(error);
        return res.status(500).json({ message: "Internal Server Error", error });
    }
};

module.exports.requestBloodFormUpdate = async(req,res)=>{
    try{
        const user = req.user;
        const { ...updateData } = req.body;
        const requestId = await bloodServices.findRequestIdByUserId(user._id);
        if (!requestId) {
            return res.status(404).json({message: "Request not found"});
        }
        const updatedRequestForm = await bloodServices.updateRequestBloodForm(requestId, updateData);
        if(!updatedRequestForm){
            return res.status(400).json({message : "Request blood form not updated"});
        }
        return res.status(200).json({message : "Request blood form updated", updatedRequestForm});
    }catch(error){
        console.log(error);
        return res.status(500).json({message : "Internal Server Error"});
    }
}

module.exports.deleteRequestBloodForm = async(req,res)=>{
    try {
        const user = req.user;
        const response = await bloodServices.deleteRequestBloodForm(user._id);
        if (!response) {
            return res.status(404).json({ message: "Request not found" });
        }
        return res.status(200).json({ message: "Request blood form deleted successfully" });
    } catch (error) {
        console.log(error);
        return res.status(500).json({ message: "Internal Server Error" });
    }
}

module.exports.deleteDonateBloodForm = async(req,res)=>{
    try {
        const user = req.user;
        const response = await bloodServices.deleteDonateBloodForm(user._id);
        if (!response) {
            return res.status(404).json({ message: "Request not found" });
        }
        return res.status(200).json({ message: "Request blood form deleted successfully" });
    } catch (error) {
        console.log(error);
        return res.status(500).json({ message: "Internal Server Error" });
    }
}