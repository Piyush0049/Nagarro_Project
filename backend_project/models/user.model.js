import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
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
    address: {
        type: String,
    },
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

export const User = mongoose.model("User", userSchema);
