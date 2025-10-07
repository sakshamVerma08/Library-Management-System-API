import { type NextFunction, type Request, type Response } from "express";
import * as z from "zod";
import client from "../db/db.js";
import type { QueryResult } from "pg";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

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
    else return true;
}

export const createUser = async (req: Request, res: Response) => {
    console.log("\nRunning createUser controller\n")
    
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

    console.log("Registration mail = ", email);

    // Hashing + Salting the password using bcrypt Algorithm.

    const saltRounds = 10;
    
    const hashedPassword = await bcrypt.hash(password,saltRounds);

    const existingUser = await checkExistingUser(email);

    if(existingUser) return res.status(400).json({message:"User already exists with similar credentials"});

    const values = [name,email,hashedPassword,role];
    const query = `INSERT INTO "User"(name,email,password,role) VALUES($1,$2,$3,$4) RETURNING *;`;

    const result: QueryResult = await client.query(query,values);

    const createdUser = result.rows[0];

    
    const token = jwt.sign({
        sub: createdUser.id, email: createdUser.email
    }, process.env.JWT_SECRET!, {expiresIn: '24h'});

    const expiry = 24*60*60*1000; //24 hours in ms

    res.cookie('token', token , {
        httpOnly: true,
        secure: process.env.NODE_ENV === 'production',
        sameSite: 'strict', // This means that only include the Session cookie in Requests that are coming from 'same site' not from some other Cross origin site.
        expires: new Date(Date.now() + expiry)
    });
    
    return res.status(200).json({message:"User Registration Successful", createdUser});


};


export const loginUser = async (req: Request, res: Response)=>{

    // const validationResult = loginSchema.safeParse(req.body);

    // if(!validationResult.success) return res.status(400).json({message:"Error validating all fields"});

    const token = req.cookies.token;

    if(!token) return res.status(400).json({message:"Unauthorized"});


    try{

        const decodedToken =  jwt.verify(token,process.env.JWT_SECRET!);

        return res.status(200).json({message:"Login successful", data: decodedToken});

    }catch(err){
        console.error(err);
        return res.status(500).json({message:"Internal Server Error"});
    }


}

export const getUser = (req: Request,res: Response)=>{

    
}