import mongoose from "mongoose";

const usersSchema = new mongoose.Schema(
    {
        id:{
            type : String,
            unique : true,
            required : true,
        },
        name : {
            type : String,
            required : true,
        },
        email :{
            type : String,
            unique : true,
            required : true,
    
        },
        phone : {
            type : String,
            required : true,
        },
        specialization :{
            type : String,
            required : true,
        },
        role : {
            type : String,
            required : true,
        },
        password : {
            type : String,
            required:true,
        }
    },{ timestamps: true }
);

const User = mongoose.model("users",usersSchema);

export default User;