import bcrypt from "bcryptjs";
import User from "../model/user.model.js";
import generateTokenAndSetCookie from "../utils/generateToken.js";
import jwt from "jsonwebtoken";


export const userSignup = async (req,res)=>{
    try{    
        const {fullName,username,password,confirmPassword,gender,profilePic} = req.body;
        console.log(password,confirmPassword);
        if(password!==confirmPassword){
            return res.status(400).json({error:"Password do not match confirmPassword."});
        }

        //https:/avatar-placeholer.iran.liara.run
        const user = await User.findOne({username}); 
        if(user){
            return res.status(400).json({error:"Username already exists."});
        }
        //HashCode the password
        const boyProfile = `https://avatar-placeholder.iran.liara.run/boy?username=${username}`;
        const girlProfile = `https://avatar-placeholder.iran.liara.run/girl?username=${username}`;
        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(password,salt);
        console.log(hashedPassword);

        const newUser = new User({
            fullName,
            username,
            password: hashedPassword,
            gender,
            profilePic: gender==="male"?boyProfile:girlProfile
        })
        console.log(newUser);
        if(newUser){
            //Generate JWT token and set cookies
            generateTokenAndSetCookie(newUser._id,res);
            await newUser.save();

            res.status(201).json({
                _id:newUser._id,
                fullName: newUser.fullName,
                username:newUser.username,
                profilePic:newUser.profilePic
            })
        }else{
            res.status(400).json({error:"Invalid user data."});
        }
        

    }catch(error){
        console.error("Error in userSignup Controller :", error.message);
        res.status(500).json({error:"Internal Server error"})
    }
}

export const userLogin = async(req,res)=>{
    try{
        const {username,password} = req.body;
        const user = await User.findOne({username});
        
        const isPassworCorrect = await bcrypt.compare(password,user.password);
        if(!isPassworCorrect || !user){
            return res.status(400).json({error:"Invalid username or password."});
        }
        generateTokenAndSetCookie(user._id,res);
        res.status(200).json({
            _id: user._id,
            username,
            gender: user.gender,
            profilePic: user.profilePic,
            fullName:user.fullName
        })
    }catch(error){
        console.log("Error in userLogin Controller :",error.message);
        res.status(500).json({error:"Internal Server error"});
    };
}

export const userLogout= async(req,res)=>{
    try{
        res.cookie("jwt","",{
            maxAge: 0
        })
        res.status(200).json({message:"Logged out successfully."})
    }catch(error){
        console.log("Eror in userLogout controller.",error.message);
        res.status(500).json({error:"Internal server error."});
    }
}