import mongoose from "mongoose";

const foodAddressSchema = new mongoose.Schema({
    streetAddress : {
        type : String,
        required : true, 
        trim : true,
    },
    loclity : {
        type : String,
        required : true, 
        trim : true,
    },
    city : {
        type : String,
        required : true, 
        trim : true,
    },
    state : {
        type : String,
        required : true, 
        trim : true,
    },
    postalCode : {
        type : String,
        required : true, 
        trim : true,
    }
});

export const FoodUserAddress = mongoose.model("FoodUserAddress", foodAddressSchema);