import express from "express";
import db from "./config.js";



const app = express();
const port = process.env.PORT || 4000;



//The query method is part of the MySQL library's Connection object.
// It allows you to perform various SQL operations such as SELECT, INSERT, UPDATE, DELETE, etc.
db.query("select * from employee where e_id=2", (err,result)=>{
console.warn("Result: ",result);
})



app.get("/",(req,res)=>{
const sql = `select * from employee`;
db.query(sql,(err,result)=>{
    if(err){
        res.status(500).send("Unexpected Error");
        return;
    }else{
        res.status(200).send({result, message:"Data fetched successfully"});
    }
})

})











app.listen(port,()=>{
    console.log(`Listening on the ${port}`);
})