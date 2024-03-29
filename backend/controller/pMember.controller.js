import MarkingRubrics from "../model/pMember.model.js";
import Assessments from "../model/assestment.model.js";

export const addRubrics = async (req, res) => {
  try {
    const newRubrics = new MarkingRubrics({
      progress: req.body.selectedValue,
      tableContent: req.body.tableData,
    });
    const saveRubrics = await newRubrics.save();

    res.status(201).json(saveRubrics);
  } catch (error) {
    console.log(error.message)
    res.status(500).json({message: "Failed to add Marking Rubrics",error});
  }
};

export const addAssestment = async (req, res) => {

  try {
    const newAssestment = new Assessments({
      assestmentName: req.body.assessmentName,
      doc: req.body.assessmentUpload,
      deadline: req.body.deadline,
      specialization:req.body.semester,
      semster:req.body.specialization,
      quesDoc:'test',
      ansDoc:'Not a Answer',
      comment : "NaN"
    });
    const saveAssestment = await newAssestment.save();

    res.status(201).json(saveAssestment);
  } catch (error) {
    console.log(error.message)
    res.status(500).json({message: "Failed to add Assestment",error});
  }
  
};


