
import pg, { Pool } from "pg";

const pool:Pool = new pg.Pool({
    connectionString: process.env.CONNECTION_STRING
});


pool.on('error',(err,client)=>{

    console.error("Unexpected error while connecting to DB: ", err);
    process.exit(1);
});


export default pool;