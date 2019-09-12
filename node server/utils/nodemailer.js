const nodemailer=require("nodemailer");


function sendEmails(sub,msg,rec,resp,cb){  // console.log(sub,msg,rec);
    nodemailer.createTestAccount((err,acc)=>{
        if(err)resp.status(500).json({"message":"Error in creating test account","error":err});
        var trans=nodemailer.createTransport({
            service:"gmail",
            auth:{
                user:"abc@xyz.com",
                pass:"******"
            }
        });
        var mailOptions={
            from:"abc@xyz.com",
            to:rec,
            subject:sub,
            html:msg
        };
        trans.sendMail(mailOptions).then(function(info){
            console.log("success: ",info); 
            if(cb)cb(resp);

        }).catch(function(err){
            if(resp)resp.status(500).json({"message":"cant send mail: ",err});
            else console.log(err); 
        });
    })

}
module.exports=sendEmails;

