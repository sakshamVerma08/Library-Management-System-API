import { type NextFunction, type Request, type Response } from "express";
import * as z from "zod";
import client from "../db/db.js";
import type { QueryResult } from "pg";
import bcrypt from "bcrypt";
import jwt, { type JwtPayload } from "jsonwebtoken";

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

    // Hashing + Salting the password using bcrypt Algorithm.

    const saltRounds = 12;
    
    const hashedPassword = await bcrypt.hash(password,saltRounds);

    const existingUser = await checkExistingUser(email);

    if(existingUser) return res.status(400).json({message:"User already exists with similar credentials"});

    const values = [name,email,hashedPassword,role];
    const query = `INSERT INTO "User"(name,email,password,role) VALUES($1,$2,$3,$4) RETURNING *;`;

    
    const result: QueryResult = await client.query(query,values);

    const createdUser: User = result.rows[0];

    
    const token = jwt.sign({
        sub: createdUser.id, email: createdUser.email, role: createdUser.role 
    }, process.env.JWT_SECRET!, {expiresIn: '24h', algorithm: "HS256"});

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

try{
    const {email,password} = req.body;

    const query = `SELECT email,password FROM "User" WHERE email = $1`;

    const user = await client.query(query,[email]);

    if(user.rowCount==0) return res.status(400).json({message:"No User with provided email found"});

    const saltRounds = 12;

    let isSamePassword;

    try{

    isSamePassword = await bcrypt.compare(password,user.rows[0].password);

    }catch(err){
        console.error(err);
        process.exit(1);

    }

    if(!isSamePassword) return res.status(400).json({message:"Wrong credentials entered"});

    return res.status(200).json({message:"Login successful"});

}catch(err){
    console.error(err);
    return res.status(500).json({message:"Internal Server Error"});
}

}

export const getUser = async (req: Request,res: Response)=>{

    try{

        const {id}  = req.params;
        const actualId = req.userId;

        // if the user who is signed in tries to access details of some other user, block that request.

        // if(id !== actualId) return res.status(400).json({message:"Can't access other user personal details"});

        const query = `SELECT name,email,role FROM "User"
    WHERE id = $1`;

        const userData = await client.query(query,[id]);

        if(userData.rowCount == 0) return res.status(400).json({message:"User not found"});

        return res.status(200).json({data: userData.rows[0], message:"User Details fetched successfully"});

    }catch(err){
        console.error(err);
        return res.status(500).json({message:"Internal Server Error"});
    }      
    
    
}