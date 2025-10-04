import { type Request, type Response } from "express";

export const createUser = (req: Request, res: Response) => {
    const { email, password } = req.body as { email: string; password: string };
    
    if(!email || !password) return res.status(400).json({message:"Both fields are required for Signup"});

    
};


export const getUser = (req: Request,res: Response)=>{

    
}