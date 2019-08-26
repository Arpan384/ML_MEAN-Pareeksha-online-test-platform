const connection=require("../connection");
const Schema=connection.Schema;
const answerSchema=new Schema({
    "username":{unique:true, required:true, type:String, index:{unique:true}},
    "testid":{required:true, type:String},
    "questionid":{required:true, type:String},
    "answer":{required:true, type:String, default:null},
    "score":{required:true, type:Number, default: 0},
});
const Answer=connection.model("answers",answerSchema);
module.exports=Answer;