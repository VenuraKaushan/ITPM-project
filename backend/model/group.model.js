import mongoose from "mongoose";

const researchGroupSchema = new mongoose.Schema(
    {
        id:{
            type : String,
            unique : true,
            required : true,
        },
        title:{
            type: String,
            required: true
        },
        area:{
            type: String,
            required: true
        },
        category:{
            type: String,
            required: true
        },
        supervisorName:{
            type: String,
            required: true
        },
        coSupervisorName:{
            type: String,
            required: true
        },
        batch:{
            type: String,
            required: true
        },

       members:[
        {
            name:{
                type: String,
                required: true
            },
            registrationNumber:{
                type: String,
                required: true,
                unique : true,

            },
            contactNumber : {
                type: String,
                required: true
            },
            email:{
                type: String,
                required: true,
                unique: true
            },
            specialization:{
                type: String,
                required: true
            }

        }
       ],

       leader:[
        {
            name:{
                type: String,
                required: true
            },
            registrationNumber:{
                type: String,
                required: true,

            },
            contactNumber : {
                type: String,
                required: true
            },
            email:{
                type: String,
                required: true,
                unique: true
            },
            specialization:{
                type: String,
                required: true
            }

        }
       ],
    },{ timestamps: true }
);

const ResearchGroups = mongoose.model("researchGroups",researchGroupSchema);

export default ResearchGroups;