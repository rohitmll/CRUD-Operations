import  mysql from 'mysql2';


//creates a new connection object to interact with the MySQL database.
const db = mysql.createConnection({
    host:"localhost",
    user:"root",
    password:"Cr1t1c@lly",
    database:"rohitdb"
})

db.connect((err)=>{
if(err){
    console.log("Error");
}else{
    console.log("Connected");
}
})

/*
db.end((err)=>{
    if(err){
        console.log("Error");
    }
    console.log("Connection Closed");
})
*/




export default db;