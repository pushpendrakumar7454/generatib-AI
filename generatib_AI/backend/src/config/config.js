import dotenv from 'dotenv'
dotenv.config()

const config = {
    PORT:process.env.PORT,
    MONGO_URI: process.env.MONGO_URI,
    ACCESS_TOKEN: process.env.JWT_ACCESS_TOKEN,
    REFRESH_TOKEN:process.env.JWT_REFRESH_TOKEN,
}


export default config