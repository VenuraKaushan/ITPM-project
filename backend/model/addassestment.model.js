import mongoose from "mongoose";
const addAssignmentSchema = new mongoose.Schema(
  {
    assestmentName: {
      type: String,
      required: true,
    },

    doc: {
      type: String,
      // required: true,
    },

    date: {
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
  },
  { timestamps: true }
);

const AddAssestment = mongoose.model("addAssestment", addAssignmentSchema);

export default AddAssestment;
