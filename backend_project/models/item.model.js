import mongoose from "mongoose";

const foodItemSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
        trim : true
    },
    itemImageURL: {
        type: String,
        required: true,
        trim : true
    },
    itemPrice: {
        type: Number,
        required: true
    },
    timeToDeliver : {
        type : Number,
        required : true,
    },
    category : [{
        type : String,
        enum : ['vegetarian', 'vegan', 'glutenfree']
    }],
    productTag : [{
        type : String,
        enum : ['salads', 'bowls', 'wraps', 'plates', 'drinks']
    }]
});

export const FoodItem = mongoose.model("FoodItem", foodItemSchema);
