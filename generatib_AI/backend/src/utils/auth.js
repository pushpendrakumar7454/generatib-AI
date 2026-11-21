import jwt from "jsonwebtoken"
import config from "../config/config.js"


export const generateAccessToken = ({ userId }) => {
    return jwt.sign({ userId },config.ACCESS_TOKEN,{expiresIn:"15m"})
}


export const generateRefreshToken = ({ userId }) => {
    return jwt.sign({ userId },config.REFRESH_TOKEN,{expiresIn:"7d"} )
}

export const readAccessToken=(accessToken)=>{
    return jwt.verify(accessToken,config.ACCESS_TOKEN)
}

export const readRefreshToken=(refreshToken)=>{
    return jwt.verify(refreshToken,config.REFRESH_TOKEN)
}