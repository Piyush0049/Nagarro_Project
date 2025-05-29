import mongoose from "mongoose";

const foodUserSchema = new mongoose.Schema({
    userName: {
        type: String,
        required: true,
    },
    email: {
        type: String,
        required: true,
        unique: true,
    },
    phoneNumber: {
        type: Number,
        required: true,
        unique: true,
    },
    password : {
        type : String,
        required : true
    },
    address: [{
        type: mongoose.Schema.Types.ObjectId,
        ref : FoodUserAddress,
    }],
    status: {
        type: String,
        enum: ["Newbie", "Elite", "Titan", "Legendary"], 
        required: true,
        default: "Newbie",
    },
    totalScore: {
        type: Number,
        default: 0,
    },
    orderHistory: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Order', 
    }]
});

export const FoodUser = mongoose.model("FoodUser", foodUserSchema);
