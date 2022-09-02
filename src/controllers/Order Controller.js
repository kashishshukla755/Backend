const orderModel= require("../models/OrderModel")
const productname =require("../models/productModel")
const userModel= require("../models/userModel")


// const createOrder= async function (req, res) {
//     let data =req.body
//     let userData =await ordermodel.create(data)
//     res.send({data:userData})
// }

    const createOrder = async function(req,res) {
        let userId = req.body.userId
        let productId = req.body.productid

        let uniqueUser = await userModel.findById(userId)
        let uniqueProduct = await productname.findById(productId)
        let freeuser = req.headers.isfreeappuser
        if (!uniqueUser || !uniqueProduct) {
            res.send({msg:"either of the user or product not present"})
        }

        else if(freeuser==="true") {
            req.body["amount"] = 0
            req.body["isFreeAppUser"] = true
            Order = await orderModel.create(req.body)
            res.send({msg:Order})
        } else if (freeuser=="false") {
            let productPrice = await productname.findById(productId).select({price:1,_id:0})
            let userPrice = await userModel.findById(userId).select({balance:1,_id:0})
            let finalPrice = userPrice.balance-productPrice.price
            let updateUserPrice = await userModel.findByIdAndUpdate(userId,{balance:finalPrice})
            req.body["amount"] = productPrice.price
            req.body["isFreeAppUser"] = false
            Order = await orderModel.create(req.body)
            res.send({msg:Order})

        }

    }

module.exports.createOrder= createOrder 