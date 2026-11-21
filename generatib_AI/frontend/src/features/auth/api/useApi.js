
import apiInstance from '../../../config/apiInstance'

export const registerUser=async(creticial)=>{
    try {
        const res=await apiInstance.post("/auth/register",creticial)
        return res
    } catch (error) {
        console.log(error)
    }
}

export const loginUser=async(crenticial)=>{
    try {
        const res=await apiInstance.post("/auth/login",crenticial)
        return res
    } catch (error) {
        console.log(error)
    }

}

export const hydreadUser=async()=>{
    try {
        const res=await apiInstance.get("/auth/me")
        console.log(res)
        return res.data
    } catch (error) {
        console.log(error)
    }
}

export const logOutUser=async()=>{
    try {
        const res=await apiInstance.post("/auth/logout")
        return res.data
    } catch (error) {
        console.log(error)
    }
}