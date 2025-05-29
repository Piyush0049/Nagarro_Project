import { FoodUser } from "../models/user.model.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import { FoodUserAddress } from "../models/address.model.js";
import { FoodOrder } from "../models/order.model.js";


export const register = async (req, res) => {
  try {
    const { userName, email, phoneNumber, password } = req.body;

    if (!userName || !email || !phoneNumber || !password) {
      return res.status(400).json({
        message: "Some required fields are missing",
        success: false,
      });
    }

    const existingUser = await FoodUser.findOne({
      $or: [{ email }, { phoneNumber }],
    });

    if (existingUser) {
      return res.status(400).json({
        message: "Email or phone number already in use",
        success: false,
      });
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    await FoodUser.create({
      userName,
      email,
      phoneNumber,
      password: hashedPassword,
    });

    return res.status(201).json({
      message: "Account created successfully",
      success: true,
    });
  } catch (e) {
    console.error(e);
    return res.status(500).json({
      message: "Internal server error",
      success: false,
    });
  }
};

export const login = async (req, res) => {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      return res.status(400).json({
        message: "Both email and password are required",
        success: false,
      });
    }

    const user = await FoodUser.findOne({ email });

    if (!user) {
      return res.status(400).json({
        message: "No user with such email exists",
        success: false,
      });
    }

    const isPasswordMatch = await bcrypt.compare(password, user.password);

    if (!isPasswordMatch) {
      return res.status(400).json({
        message: "Incorrect password",
        success: false,
      });
    }

    const tokenData = {
      userId: user._id,
    };

    const token = jwt.sign(tokenData, process.env.SECRET_KEY, {
      expiresIn: "1d",
    });

    return res
      .status(200)
      .cookie("token", token, {
        maxAge: 1 * 24 * 60 * 60 * 1000,
        httpOnly: true,
        sameSite: "strict",
      })
      .json({
        message: `Welcome back ${user.userName}`,
        success: true,
      });
  } catch (e) {
    console.error(e);
    return res.status(500).json({
      message: "Internal server error",
      success: false,
    });
  }
};

export const logout = async (req, res) => {
    try {
        return res.status(200).cookie("token", "", { maxAge: 0 }).json({
            message: "logged out successfully",
            success: true
        })
    } catch (e) {
        console.log(e);
    }
}

export const addAddress = async (req, res)=>{
  try{
    const {streetAddress, locality, city, state, postalCode } = req.body;
    if(!streetAddress || !locality || !city || !state || !postalCode){
      return res.status(400).json({
        message : "missing required field data",
        success : false,
      })
    }
    const addressObject = await FoodUserAddress.create({
      streetAddress,
      locality,
      city,
      state,
      postalCode
    })

    const userId = req.id;
    const user = await FoodUser.findById(userId);

    if(!user) return res.status(400).json({
      message : "User not found",
      success : false
    })

    user.address.push(addressObject._id);
    await user.save();

    const updatedUser = await FoodUser.findById(userId).populate("address");

    return res.status(200).json({
      message: "Address added successfully",
      success: true,
      user: updatedUser
    });
  
  }catch(e){
    console.error(e);
    return res.status(500).json({
      message: "Internal server error",
      success: false,
    });
  }
}

export const placeOrder = async (req,res)=>{
  try{
    const {orderItems, totalValue, totalPoints} = req.body;
    if(!orderItems || !totalValue) return res.status(400).json({
      message: "missing required data",
      success : false
    })
    let itemArr;
    if (orderItems) itemArr = orderItems.split(",").map(item => item.trim());

    const order = await FoodOrder.create({
      orderItems : itemArr,
      totalValue,
      totalPoints : (!totalPoints) ? 0 : totalPoints,
    })
    const userId = req.id
    const user = await FoodUser.findById(userId)

    if(!user) return res.status(400).json({
      message : "User not found",
      success : false
    })

    user.orderHistory.push(order._id)
    await user.save()

    const updatedUser = await FoodUser.findById(userId).populate("orderHistory");
    return res.status(200).json({
      message: "Order placed successfully",
      success: true,
      user: updatedUser
    });

  }catch(e){
    console.error(e);
    return res.status(500).json({
      message: "Internal server error",
      success: false,
    });
  }
}

