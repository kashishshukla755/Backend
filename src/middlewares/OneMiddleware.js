const mid1 =function(req,res,next){
    const data =req.headers.isfreeappuser

    if(!data){
res.send({msg:"the request is missing a mandatory header"})
    }
    req.body["isFreeAppUser"]=data
    next()
}
    const mid2 = async function (req, res, next) {
       let data = req.body
       let isFreeAppUserispresent= req.headers.isfreeappuser
       if(isFreeAppUserispresent){

        data["isFreeAppUser"] =isFreeAppUserispresent
        next()
       }else{
        res.send({msg:"missing a headers"})
       }
       } 
    //    ===================================================================================

//     const isFreeAppUser = async function(req,res,next){
//    let collection = req.headers.isfreeappuser


//    if(!collection ){

//         res.send({msg:"header must be in boolean(true or false)"})

//    }
//    req.body["isFreeAppUser"]=collection
//    next()
//    }


       module.exports.mid1=mid1
       module.exports.mid2=mid2