import { Request,Response } from "express"
import bcrypt from "bcryptjs"
import jwt from "jsonwebtoken";
import { User } from "../models/user.model"

//register new user 
export const registerUser = async (req:Request, res:Response)=>{
    try{
        const { firstname ,password , repeatedPassword, lastname , email , role } = req.body;
        const emailChecker = await User.findOne({email});
        if(emailChecker){
            return res.status(400).json({message: "User already exists with this email address!"});
        }
        if(password !== repeatedPassword){
            return res.status(400).json({message: "The password doesn't match!"});
        }
        if(role !== "Trainer" && role !== "Member"){
            return res.status(400).json({message: "Trainer and Member roles only available!"});
        }
        const hashedPassword = await bcrypt.hash(password, 10);
        const user = await User.create({
            fullname:{
                firstname,
                lastname
            },
            email,
            password:hashedPassword,
            role
        });
        res.status(201).json({message : "User created successfully!!"});
    }catch(err){
        res.status(500).json({message : "Failed to create User!"});
    }
    
}
// login user :D
export const loginUser = async (req:Request, res:Response)=>{
    try{
        const {email, password} = req.body;
        if(!email || !password){
            return res.status(400).json({message : "Email and password are required!"});
        }
        const user = await User.findOne({email})
        if(!user){
            return res.status(401).json({message : "There is no account in this e-mail please sign in first!"});
        }
        const isPasswordValid = await bcrypt.compare(password,user.password)
        if(!isPasswordValid){
            return res.status(401).json({message : "Invalid email or password!"});
        }
        const secert = process.env.JWT_SECRET as string;
        const expires = 60*60*24; // 1 Day
        const token = jwt.sign(
            {
                email:user.email,
                role:user.role
            },
            secert,
            {expiresIn: expires }
        )
        res.cookie('token',token,{
            httpOnly:true,
            maxAge: expires *1000
        })
        res.status(200).json({message : "Login successfully!!"});
    }catch(err){
        res.status(500).json({message : "Server Error!"});
    }

    

}