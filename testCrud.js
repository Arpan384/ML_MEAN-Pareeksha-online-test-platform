const User=require("../models/userModel");
const Test=require("../models/testModel");

const quesOps = require("../helpers/questionCrud");

const sendEmails=require("../../utils/nodemailer");
const jsonWebToken=require("../../utils/jsonwebtoken");

const testOps = {
    create(req,res){
        if(req.token==undefined  || jsonWebToken.verifyToken(req.token)==null){
            res.status(403).json({"message":"Illegal action", "promptlogin":true})
        }
        else{
            var username = jsonWebToken.verifyToken(req.token);
            User.findOne({username}, (err,doc)=>{
                if(err)res.status(500).json({"message":"Error in user fetch", "error":err})
                else{
                    if(doc.role=="teacher"){
                        var test = req.test;
                        Test.create({test}, (error)=>{
                            if(err){
                                if(err.code==11000) res.status(500).json({"message":"Test already exists", "testconflict":true})
                                else res.status(500).json({"message":"Error in test create", "error":error})
                            }
                            else {
                                sendEmails(`Test Created Successfully`,`You've successfully created the test: ${req.test.name}`,`${doc.username}`)
                                Test.findOne({username, name:req.test.name},(err1, testdoc)=>{
                                    if(err)res.status(500).json({"message":"Error in test fetch", "error":err1})
                                    else {
                                        if(testdoc){
                                            var testid = testdoc._id;
                                            // quesOps.add(req.ques, testid, res);
                                        }
                                    }
                                })
                                
                                
                                res.status(200).json({"message":"Test added successfully"})
                            }
                        })
                    }
                    else res.status(404).json({"message":"Teacher not found", "promptlogin":true})
                }
            })
        }
    }
}

module.exports = testOps;



