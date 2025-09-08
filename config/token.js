import jwt from "jsonwebtoken";


export const genToken = async(userId) =>{
try {
    let token = jwt.sign({userId}, process.env.JWT_SECRET, {expiresIn: "7d"});
    return token;
} catch (error) {
    console.error("Error generating token:", error.message);
    
}
}