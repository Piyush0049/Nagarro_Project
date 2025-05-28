import mongoose from "mongoose";

const orderSchema = new mongoose.Schema({
    timeOfOrder: {
        type: Date,
        default: Date.now,
    },
    orderItems: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: "Item"
    }],
    totalValue: {
        type: Number,
        required: true,
    },
    totalPoints: {
        type: Number,
        default: 0
    }
});

export const Order = mongoose.model("Order", orderSchema);
