 import dotenv from "dotenv";
 const result = dotenv.config({path:"./.env"});

 if(result.error) throw result.error;


import {Client} from "pg";


const client = new Client({

    host: process.env.DB_HOST,
    port: parseInt(process.env.DB_PORT || "5432"),
    user: process.env.DB_USER,
    database: process.env.DB_NAME,
    password: process.env.DB_PASSWORD, 
    ssl:{
        rejectUnauthorized:false
    }


});


try{
    
    await client.connect();
    console.log("✅ Connection to PostgreSQL db was successful");

}catch(err){
    console.error("❌ Unexpected error while connecting to PostgreSQL db ",err);
}


export default client;