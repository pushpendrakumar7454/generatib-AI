import mongoose from "mongoose"

const connectDb = async() => {
    try {
        await mongoose.connect("mongodb+srv://pushpendrakumar7454981358_db_user:cohort3@cohort3.dneyjgs.mongodb.net/")
        console.log("connect db")
    } catch (error) {
        console.log(error)
    }
}

export default connectDb