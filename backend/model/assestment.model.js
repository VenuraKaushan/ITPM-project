import mongoose from "mongoose";

const AssessmentSchema = new mongoose.Schema(
  {
    assestmentName: {
      type: String,
      required: true,
    },

    quesDoc: {
      type: String,
      default : '',
    },

    ansDoc: {
      type: String,
      default : '',
      required: true,
    },

    deadline: {
      type: Date,
      required: true,
    },

    specialization: {
      type: String,
      required: true,
    },

    semster: {
      type: String,
      required: true,
    },
    comment:{
      type: String,
      default : "NaN"
    }
  },
  { timestamps: true }
);

const Assessments = mongoose.model("assessment", AssessmentSchema);

export default Assessments;
