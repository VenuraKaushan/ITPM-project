import mongoose from "mongoose";

const usersSchema = new mongoose.Schema(
    {
        id: {
            type: String,
            unique: true,
            required: true

        },
        regNo: {
            type: String,
            default: "NaN",
            required: true,
        },
        name: {
            type: String,
            required: true,
        },
        email: {
            type: String,
            unique: true,
            required: true,

        },
        phone: {
            type: String,
            required: true,
            default: "NaN",
        },
        specialization: {
            type: String,
            default: "all",
            required: true,
        },
        role: {
            type: String,
            required: true,
        },
        password: {
            type: String,

        },
        batch: {
            type: String,
        },
        semester: {
            type: String,
            default: "NaN"
        },
        isPasswordChanged: {
            default: false,
            type: Boolean,
            require: true,
        },
    }, { timestamps: true }
);

const User = mongoose.model("users", usersSchema);

export default User;