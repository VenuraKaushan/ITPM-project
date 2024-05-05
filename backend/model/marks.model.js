import mongoose from "mongoose";

const MarksSchema = new mongoose.Schema(
  {
    groupID: {
      type: String,
      required: true,
    },

    proposalMarks:[
        {
            registrationNumber:{
                type: String,
                required: true,
                unique : true,

            },
            marks:{
                type: String,
                default: 0,
            }
        }
    ],
    progress1Marks:[
        {
            registrationNumber:{
                type: String,
                required: true,
                unique : true,

            },
            marks:{
                type: String,
                default: 0,
            }
        }
    ],
    progress2Marks:[
        {
            registrationNumber:{
                type: String,
                required: true,
                unique : true,

            },
            marks:{
                type: String,
                default: 0,
            }
        }
    ],
    finalPresentationMarks:[
        {
            registrationNumber:{
                type: String,
                required: true,
                unique : true,

            },
            marks:{
                type: String,
                default: 0,
            }
        }
    ],
    comments:[
        {
            registrationNumber:{
                type: String,
                required: true,
                unique : true,

            },
            comment:{
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
