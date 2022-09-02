const {count}=require("console")
const { nextTick } = require("process")
const{isFreeAPPUser}= require("../middlewares/OneMiddleware")
const userModel =require("../models/userModel")



const createuser =async function(req,res){

    let data =req.body
    let userData =await userModel.create(data)
    res.send({data:userData})
}
module.exports.createuser=createuser