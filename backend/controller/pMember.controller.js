import MarkingRubrics from "../model/rubrics.model.js";
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


//add question to db
export const uploadQuestiontDoc = async (req, res) => {
  console.log("ajshf")

  try {
    console.log(req.body); // Check if body contains any data
    console.log(req.file);

    return res.status(200).json(req.file);

  } catch (error) {
    console.log(error.message);
    return res.status(500).json({ message: 'Failed to upload assessment.', error: error.message });
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
      quesDoc: req.body.submitDoc.path,
      ansDoc:'Not a Answer',
      comment : "NaN"
    });

    console.log(newAssestment);
    
    const saveAssestment = await newAssestment.save();

    res.status(201).json(saveAssestment);
  } catch (error) {
    console.log(error.message)
    res.status(500).json({message: "Failed to add Assestment",error});
  }
  
};

