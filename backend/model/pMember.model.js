import mongoose from "mongoose";

const pMemberRubricsSchema = new mongoose.Schema(
  {
    progress: {
      type: String,
      required: true,
    },
    tableContent: [
      {
        id: {
          type: Number,
          required: true,
        },

        criteria: {
          type: String,
          required: true,
        },

        subCriteria: {
          type: String,
          required: true,
        },

        description: {
          type: String,
          required: true,
        },

        marks: {
          type: String,
          required: true,
        },
      },
    ],
  },
  { timestamps: true }
);

const MarkingRubrics = mongoose.model("markingRubrics", pMemberRubricsSchema);

export default MarkingRubrics;
