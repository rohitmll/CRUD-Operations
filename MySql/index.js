import express from "express";
import db from "./config.js";
import bodyParser from "body-parser";



const app = express();
const port = process.env.PORT || 4000;

// Middleware to parse JSON bodies
app.use(bodyParser.json())

// Parsing the JSON body : refers to the process of converting a JSON-formatted string sent in an HTTP request 
// into a JavaScript object that can be easily accessed and manipulated within your application.

// body-parser : is a middleware used to parse incoming request bodies before your handlers,
// making the data available in the req.body property.




//The query method is part of the MySQL library's Connection object.
// It allows you to perform various SQL operations such as SELECT, INSERT, UPDATE, DELETE, etc.
db.query("select * from employee where e_id=2", (err,result)=>{
console.warn("Result: ",result);
})


//// Get 
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


//// Post

app.post("/inserting_data",(req,res)=>{
    const data = req.body;    // Access the parsed JSON data
    const sql = "insert into employee set ?"
    db.query(sql,data,(err,result)=>{
        if(err){
            res.status(500).send("Unexpected Error");
            return;
        }else{
            res.status(200).send({result, message:"Data inserted successfully"});
        }
    })
})
//SET: This keyword is used to specify the columns and their corresponding values for the insertion.
// ?: This is a placeholder that will be replaced by the data object passed as an argument in the query method.
// This approach helps to prevent SQL injection attacks by escaping the values properly.
//   req.body : extracting the JSON data from the request body sent by the client.



app.post("/inserting_data_1",(req,res)=>{
    const {e_name,e_phone,e_address} = req.body;
    const sql = `insert into employee (e_name,e_phone,e_address) values(?,?,?)`;

    db.query(sql,[e_name,e_phone,e_address],(err,result)=>{
        if(err){
            res.status(500).send("Unexpected Error");
            return;
        }else{
            res.status(200).send({result, message:"Data inserted successfully"});
        }
    })
})


//// Put

app.put("/:e_id",(req,res)=>{

    const data = [req.body.e_name, req.params.e_id];
    const sql = `update employee set e_name=? where e_id=?`;

    db.query(sql,data,(err,result)=>{
        if(err){
            res.status(500).send("Unexpected Error")
        }else{
            res.status(200).send({result,message:"Data updated successfully"})
        }
    })
})

// req.params - it is used to retrieve parameters from the route of an HTTP request. 
// When defining routes in Express, you can specify placeholders for parameters by using a colon (:) followed by the parameter name.
//  These placeholders are then accessible through req.params in the route handler function.


//// Delete

app.delete("/deleting/:e_id",(req,res)=>{

    const data = req.params.e_id;
    const sql = `delete from employee where e_id=?`

    db.query(sql,[data],(err,result)=>{
        if(err){
            res.status(500).send("Unexpected Error")
        }else{
            res.status(200).send({result,message:"Data deleted successfully"})
        }

    })

})







app.listen(port,()=>{
    console.log(`Listening on the ${port}`);
})