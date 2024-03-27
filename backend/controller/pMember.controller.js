import MarkingRubrics from "../model/pMember.model.js";
import AddAssestment from "../model/addassestment.model.js";

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
    const newAssestment = new AddAssestment({
      assestmentName: req.body.assessmentName,
      doc: req.body.assessmentUpload,
      date: req.body.deadline,
      specialization:req.body.semester,
      semster:req.body.specialization,
    });
    const saveAssestment = await newAssestment.save();

    res.status(201).json(saveAssestment);
  } catch (error) {
    console.log(error.message)
    res.status(500).json({message: "Failed to add Assestment",error});
  }
  
};


