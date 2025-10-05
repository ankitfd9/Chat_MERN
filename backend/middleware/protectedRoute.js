import jwt from "jsonwebtoken";
import User from "../model/user.model.js";

export const protectedRoute= async (req,res,next)=>{
    try{
        const token = req.cookies.jwt;


        if(!token){
            return res.status(400).json({error: "Token incorrect or expired."});
        }

        const decoded = jwt.verify(token, process.env.JWT_SECRET_KEY);

        if(!decoded){
            return res.status(400).json({error: "Token incorrect or expired."});
        }

        const user = await User.findById(decoded.userId).select("-password");

        if(!user){
            return res.status(400).json({error: "TUser not found."});
        }
        req.user = user;
        next();
    }catch(error){
        console.log("Error in verifying json token",error);
        return res.status(500).json({error:"Internal Server error."})
    }
}