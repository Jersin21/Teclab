const jwt =  require("jsonwebtoken");


module.exports.generateJWT = (id) => {
return jwt.sign({id}, process.env.JWT_SECRET, {expiresIn:"30d"})
    
}