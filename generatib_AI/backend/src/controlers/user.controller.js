import userModel from "../modules/user.module.js";
import bcrypt from "bcrypt";
import {
  generateAccessToken,
  generateRefreshToken,
  readRefreshToken,
} from "../utils/auth.js";

export const authRegisterController = async (req, res) => {
  try {
    const { name, email, password, username, number } = req.body;

    const allreadyExsitsEmail = await userModel.findOne({ email });

    if (allreadyExsitsEmail) {
      return res.status(400).json({
        message: "email allready exists",
      });
    }

    const user = await userModel.create({
      name,
      username,
      email,
      number,
      password: await bcrypt.hash(password, 6),
    });

    const accessToken = generateAccessToken({ userId: user._id });
    const refreshToken = generateRefreshToken({ userId: user._id });

    res.cookie("refreshToken", refreshToken, {
      httpOnly: true,
    });

    await userModel.findByIdAndUpdate(user._id, { refreshToken });

    return res.status(201).json({
      message: "user register succefully",
      data: {
        user: {
          name: user.name,
          email: user.email,
          number: user.number,
          id: user._id,
          username: user.username,
        },
        accessToken,
      },
    });
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      message: "internal server error",
    });
  }
};

export const authLoginController = async (req, res) => {
  try {
    const { email, password } = req.body;

    const user = await userModel.findOne({ email });
    if (!user) {
      return res.status(400).json({
        message: "email or password invalid",
      });
    }

    const isValidPassword = await bcrypt.compare(password, user.password);

    if (!isValidPassword) {
      return res.status(400).json({
        message: "email or password invalid",
      });
    }

    
    const accessToken = generateAccessToken({ userId: user._id });
    const refreshToken = generateRefreshToken({ userId: user._id });

    res.cookie("reefreshToken", refreshToken, {
      httpOny: true,
    });

    await userModel.findOneAndUpdate({ email }, { refreshToken });

    return res.status(200).json({
      message: "user login succefully",
      data: {
        user: {
          name: user.name,
          email: user.email,
          id: user._id,
        },
        accessToken,
      },
    });
  } catch (error) {
    return res.status(500).json({
      message: "internal server error",
    });
  }
};

export const authRefreshController = async (req, res) => {
  const refreshToken = req.cookies.refreshToken;
  if (!refreshToken) {
    return res.status(400).json({
      message: "refresh Token nott found",
    });
  }

  try {
    const decoded = readRefreshToken(refreshToken);
    const { userId } = decoded;

    const user = await userModel.findById(userId);
    if (!user) {
      return res.status(400).json({
        message: "user not found",
      });
    }

    if (refreshToken !== user.refreshToken) {
      await userModel.findByIdAndUpdate(user._id, { refreshToken: null });
    }

    const accessToken = generateAccessToken({ userId: user._id });
    const newRefreshToken = generateRefreshToken({ userId: user._id });

    res.cookie("refreshToken", newRefreshToken, {
      httpOnly: true,
    });

    await userModel.findByIdAndUpdate(user._id, { newRefreshToken });

    return res.status(200).json({
      message: "refreshToken roteted",
      data: {
        user: {
          name: user.name,
          email: user.email,
          number: user.number,
          id: user._id,
          username: user.username,
        },
        accessToken,
      },
    });
  } catch (error) {
    return res.status(500).json({
      message: "internal server error",
    });
  }
};



export const authMeController = async (req, res) => {
  try {
    const { userId } = req.user;

    const user = await userModel.findById(userId);

    return res.status(200).json({
      message: "user find succefully",
      data: {
        user: {
          name: user.name,
          username: user.username,
          email: user.email,
          id: user._id,
        },
      },
    });
  } catch (error) {
    return res.status(500).json({
      message: "internal server error",
    });
  }
};


export const authLogoutController=async(req,res)=>{

    const refreshToken=req.cookies.refreshToken

    if(!refreshToken){
        return res.status(401).json({
            message:"refresh token not found"
        })
    }

    try {

        const decoded=readRefreshToken(refreshToken)

        const{userId}=decoded

    const user=await userModel.findById(userId)

    if(!user){
        return res.status(401).json({
            message:"user not found"
        })
    }

    await userModel.findByIdAndUpdate(user._id,{refreshToken:null})
    res.clearCookie("refreshToken")

    return res.status(200).json({
        message:"user logout succefully",
        data:{
            user:user.name,
            email:user.email,
            id:user._id
        }
    })
        
    } catch (error) {
        return res.status(500).json({
            message:"internal server error"
        })
    }
}

export const allUserController=async(req,res)=>{
  try {
    
    const user=await userModel.find()

    return res.status(200).json({
      message:"fetched all user successfully",
      user
    })

  } catch (error) {
    return res.status(500).json({
      message:"internal server error"
    })
  }
}