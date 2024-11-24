import 'dotenv/config.js';
import jwt from 'jsonwebtoken';


const secretKey = process.env.SECRET_KEY;

const authenticateJWT =(req, res, next) => {

    const token = req.headers.authToken;

    if(!token){
        return res.status(403).json({message: "Token is required"});
    }

    try {
        const decoded = jwt.verify(token, secretKey);
        req.user = decoded;
        next();
    }
    catch (error){
        return res.status(401).json({error: ` Invalid token ${error}`});
    }
}

export default authenticateJWT;