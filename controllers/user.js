import { User } from "../models/user.js"
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import { sendcookie } from "../utils/features.js";

export const getAllUsers = async (req, res) => { };

export const login = async (req, res) => {

    const {email,password} = req.body;

    const user = await User.findOne({email}).select("+password");

    if (!user) return res.status(404).json({
        success: false,
        message: "Invalid Email or Password",
    })

    const isMatch = await bcrypt.compare(password,user.password);

    if (!isMatch) return res.status(404).json({
        success: false,
        message: "Invalid Email or Password",
    })

    sendcookie(user,res,`Welcome Back ${user.name}`,200);

 };

export const register = async (req, res) => {
  
    const { name, email, password } = req.body;

    let user = await User.findOne({ email });

    if (user) return res.status(404).json({
        success: false,
        message: "User Already Exists",
    })

    const hashedPassword = await bcrypt.hash(password, 10);

    user = await User.create({ name, email, password: hashedPassword });

    sendcookie(user,res,"Registered Successfully",201);

};

export const getMyProfile = async (req, res) => {
  
        res.status(200).json({
            success : true,
            user : req.user,
        })
 }

 export const logout = (req,res) => {

    res.status(200).cookie("token","",{
        expire: new Date(Date.now()),
        sameSite :process.env.NODE_ENV === "development" ? "lax" : "none",
        secure :process.env.NODE_ENV === "development" ? false : true,
    }).json({
    success : true,
    message : req.user,
    })
 }