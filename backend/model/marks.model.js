import mongoose from "mongoose";

const MarksSchema = new mongoose.Schema(
    {
        groupID: {
            type: String,
            required: true,
        },
        cusGroupNo: {
            type: String,
            required: true,
        },
        Title: {
            type: String,
            required: true,
        },

        student: [{
            registrationNumber: {
                type: String,
                required: true,

            },

            proposalMarks: {
                type: String,
                default: 0,
            },

            progress1Marks: {
                type: String,
                default: 0,
            },

            progress2Marks: {
                type: String,
                default: 0,
            },

            finalPresentationMarks: {
                type: String,
                default: 0,
            },

            comments: {
                type: String,
                default: "NaN",
            }
        }
        ],

    },
    { timestamps: true }
);

const Marks = mongoose.model("marks", MarksSchema);

export default Marks;
