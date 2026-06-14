const jwt=require("jsonwebtoken");
const db=require("../config/db");

const protect = async (req,res,next)=>{
    try{
        let token;
        if (req.headers.authorization &&
            req.headers.authorization.startsWith("Bearer")){
            token=req.headers.authorization.split(" ")[1];
            }
        if(!token){
            return res.status(401).json({
                success:false,
                message:"Not authorized - no token"
            });
        }
        const decoded=jwt.verify(token,process.env.JWT_SECRET);

        const [users]=await db.query(
            "SELECT id,name,email,role FROM users WHERE id= ?",
            [decoded.id]
        );
        if (users.length ===0) {
            return res.status(401).json({
                success:false,
                message:"Not authorized - user not found"
            });
        }

        req.user=users[0];
        next();

    }catch(error){
        res.status(401).json({
            success:false,
            message:"Not authorized - invalid token"
        });
    }
};

const adminOnly=(req,res,next)=>{
    if (req.user && req.user.role === "admin") {
       next(); 
    }else{
        res.status(403).json({
            success:false,
            message:"Access denied - admin only"
        });
    }
};
module.exports={protect,adminOnly};