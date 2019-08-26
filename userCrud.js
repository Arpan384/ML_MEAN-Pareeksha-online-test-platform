const User=require("../models/userModel");
const sendEmails=require("../../utils/nodemailer");
const jsonWebToken=require("../../utils/jsonwebtoken");
const bcrypt=require("../../utils/bcrypt");


const userOps={
    register(req,res){
        req.user.password = bcrypt.encryptPassword(req.user.password);
        User.create(req.user, (err)=>{
            if(err){
                if(err.code==11000)res.status(500).json({"message":"Username Already Exists", "userconflict":true})
                else {
                    res.status(500).json({"message":"Error in user add", "error":err})
                }
            }
            else {
                var msg = "Hope You Score Well :)";
                    if(req.user.role=="teacher") msg = "Hope you enjoy this platform :)";
                    msg = `Hello ${req.user.username}, ` + `Thanks for registering with us as a ${req.user.role}` + msg; 
                    sendEmails(`Congrats, registration successful!!`,msg,`${req.user.email}`)
                res.status(200).json({"megssage":"User added successfully"})
            }
        })
    },

}

module.exports=userOps;