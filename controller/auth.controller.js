import { genToken } from "../config/token.js"
import User from "../models/usermodel.js"
import bcrypt from "bcryptjs"

export const signUp = async(req,res)=>{
    try {
        const {name, email,password}= req.body

       
    
    if(!name || !email || !password){
        return  res.status(404).json({success: false , message:"missing details"})
    }
    
        const existingUser = await User.findOne({email})


        if(existingUser){
            return res.json({success:false , message:"User already exists"})
        }
       
        if(password.length < 6){
            return res.json({success:false , message:"Password must be at least 6 characters"})
        }
        const hashedPassword = await bcrypt.hash(password , 10)
        const user = await User.create({name, email, password:hashedPassword})

        await user.save();

        const token = await genToken(user._id);
           res.cookie("token", token, {
            httpOnly: true,
            secure:true,
            sameSite: "None",
            maxAge: 7 * 24 * 60 * 60 * 1000 // 7 days
        });
        console.log("User registered successfully:", user);

return res.status(200).json(user);



    } catch (error) {
        return  res.json({success:false , message:error.message})
    }
}

export const signIn = async (req, res) => {
    try {
  const { email, password } = req.body;
  if (!email || !password) {
    return res.status(400).json({ success: false, message: "Email and password are required" });
  }

    const user = await User.findOne({ email });
    if (!user) {
      return res.status(401).json({ success: false, message: "Invalid email" });
    }

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(401).json({ success: false, message: "Incorrect password" });
    }

   
     const token = await genToken(user._id);
           res.cookie("token", token, {
            httpOnly: true,
            secure:true,
            sameSite: "None",
            maxAge: 7 * 24 * 60 * 60 * 1000 // 7 days
        });
   

    return res.status(200).json({ success: true, message: "User login", user });
  } catch (error) {
    console.error("Login error:", error);
    return res.status(500).json({ success: false, message: "Server error" });
  }
};

// logout
export const logout = async (req,res)=>{
    try {
       res.clearCookie("token", {
  httpOnly: true,
  secure: false,
  sameSite: "Strict"
});
        return res.json({success:true, message:"User Logout"})
    } catch (error) {
        console.log("logout error")
        return  res.json({success:false , message:"logout error"})
    }
}
