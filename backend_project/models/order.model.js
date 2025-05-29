import mongoose from "mongoose";

const foodOrderSchema = new mongoose.Schema({
    timeOfOrder: {
        type: Date,
        default: Date.now,
    },
    orderItems: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: "FoodItem"
    }],
    totalValue: {
        type: Number,
        required: true,
    },
    totalPoints: {
        type: Number,
        default: 0
    }
}, { timestamps: true });

export const FoodOrder = mongoose.model("FoodOrder", foodOrderSchema);
