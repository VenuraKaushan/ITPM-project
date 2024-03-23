import MarkingRubrics from "../model/pMember.model.js";

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
