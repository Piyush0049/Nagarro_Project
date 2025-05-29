import mongoose from "mongoose";

const itemSchema = new mongoose.Schema({
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
        type : String
    }],
    productTag : [{
        type : String
    }]
});

export const Item = mongoose.model("Item", itemSchema);
