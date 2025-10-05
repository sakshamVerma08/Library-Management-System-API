import { type Request, type Response } from "express";
import * as z from "zod";
import client from "../db/db.js";
import type { QueryResult } from "pg";
import bcrypt from "bcrypt";

const registerSchema = z.object({
    name: z.string().min(3),
    email: z.email(),
    password: z.string().min(5),
    role: z.string(),
        
});

const loginSchema = z.object({
    email: z.email(),
    password: z.string()
});

const checkExistingUser = async (email: string)=>{

    const query = `
        SELECT id FROM "User"
        WHERE email = $1;
    `;

    const response = await client.query(query,[email]);

    if(response.rowCount==0) return false;
    return true;
}

export const createUser = async (req: Request, res: Response) => {
    
    // Validating the Request Body using Zod validations (parsing it).

    const validationResult = registerSchema.safeParse(req.body);

    if(!validationResult.success){
        console.error("Error while validating user info at backend : ", validationResult.error);
        return res.status(400).json({message:"Error while Validating fields"});
    }

    const email = validationResult.data.email;
    const password = validationResult.data.password;
    const name = validationResult.data.name;
    const role = validationResult.data.role;

    // Hashing + Salting the password using bcrypt Algorithm.

    const saltRounds = 10;

    
    const hashedPassword = await bcrypt.hash(password,saltRounds);

    const existingUser = await checkExistingUser(email);

    if(existingUser) return res.status(400).json({message:"User already exists with similar Id"});

    const values = [name,email,hashedPassword,role];
    const query = `INSERT INTO "User"(name,email,password,role) VALUES($1,$2,$3,$4) RETURNING *;`;

    const result: QueryResult = await client.query(query,values);

    const createdUser = result.rows[0];

    

    
    return res.status(200).json({message:"User Registration Successful"});

};


export const loginUser = async (req: Request, res: Response)=>{

    const validationResult = loginSchema.safeParse(req.body);

    if(!validationResult.success) return res.status(400).json({message:"Error in validation Fields"});

    const {email,password} = req.body;


}


export const getUser = (req: Request,res: Response)=>{

    
}