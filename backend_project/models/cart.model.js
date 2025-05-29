import mongoose from "mongoose";

const foodCartSchema = new mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "FoodUser",
    required: true,
    unique: true,
  },
  items: [
    {
      product: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "FoodItem",
        required: true,
      },
      quantity: {
        type: Number,
        required: true,
        min: 1,
        default: 1,
      },
    },
  ],
  updatedAt: {
    type: Date,
    default: Date.now,
  },
});

foodCartSchema.pre('save', function(next) {
  this.updatedAt = Date.now();
  next();
});

export const FoodCart = mongoose.model("FoodCart", foodCartSchema);
