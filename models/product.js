const mongoose = require("mongoose");
const ProductSchema = new mongoose.Schema(
    {
        tittle : {
            type : String,
            required : true,
            unique : true,
        },

        description : {
            type : String,
            required : true,
        },

        images : {
            type : String,
            required : true,
        },

        categories : {
            type : String,
            required : true,
        },
        size : {
            type : String,
            required : true,
        },
        price : {
            type : String,
            required : true,
        },
        color : {
            type : String,
            required : true,
        },
    },

    {timestamps : true}
)

module.exports = mongoose.model("Product", ProductSchema);