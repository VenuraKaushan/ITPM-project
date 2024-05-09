import MarkingRubrics from "../model/rubrics.model.js";
import Assessments from "../model/assestment.model.js";
import ResearchGroups from "../model/group.model.js";

export const addRubrics = async (req, res) => {
  try {
    const newRubrics = new MarkingRubrics({
      progress: req.body.selectedValue,
      tableContent: req.body.tableData,
    });
    const saveRubrics = await newRubrics.save();

    res.status(201).json(saveRubrics);
  } catch (error) {
    console.log(error.message);
    res.status(500).json({ message: "Failed to add Marking Rubrics", error });
  }
};

//add question to db
export const uploadQuestiontDoc = async (req, res) => {
  try {
    console.log(req.body); // Check if body contains any data
    console.log(req.file);

    return res.status(200).json(req.file);
  } catch (error) {
    console.log(error.message);
    return res
      .status(500)
      .json({ message: "Failed to upload assessment.", error: error.message });
  }
};

export const addAssestment = async (req, res) => {
  try {
    const newAssestment = new Assessments({
      assestmentName: req.body.assessmentName,
      doc: req.body.assessmentUpload,
      deadline: req.body.deadline,
      specialization: req.body.specialization,
      semster: req.body.semester,
      quesDoc: `/${req.body.submitDoc.path}`,
      ansDoc: "Not a Answer",
      comment: "NaN",
    });

    console.log(newAssestment);

    const saveAssestment = await newAssestment.save();

    res.status(201).json(saveAssestment);
  } catch (error) {
    console.log(error.message);
    res.status(500).json({ message: "Failed to add Assestment", error });
  }
};

export const editAssestment = async (req, res) => {
  const { _id } = req.body;

  try {
    const updatedAssestment = {
      assestmentName: req.body.assessmentName,
      doc: req.body.assessmentUpload,
      deadline: req.body.deadline,
      specialization: req.body.semester,
      semster: req.body.specialization,
      quesDoc: req.body.submitDoc.path,
      ansDoc: "Not a Answer",
      comment: "NaN",
    };

    const result = await Assessments.findByIdAndUpdate(_id, updatedAssestment, {
      new: true,
    });

    if (!result) {
      return res.status(404).json({ message: "Assessment not found" });
    }

    res.status(200).json(result);
  } catch (error) {
    console.error(error.message);
    res.status(500).json({ message: "Failed to edit assessment", error });
  }
};

export const getAssessment = async (req, res) => {
  try {
    const assessments = await Assessments.find({ ansDoc: "Not a Answer" });

    console.log(assessments);
    res.status(200).json(assessments);
  } catch (err) {
    res.status(500).json({ message: "Failed to get Assessments data", err });
  }
};

//Delete Assessment
export const deleteAssestment = async (req, res) => {
  const _id = req.params.id;
  const assessmentName = req.params.assessmentName;

  try {
    console.log("controller delete");
    const deletedAssestment = await Assessments.findByIdAndDelete(_id);

    if (!deletedAssestment) {
      // If the worker is not found, send a 404 status code with a message
      return res.status(404).json({ message: "Assessments not found" });
    }

    res.status(200).json({ message: "Assessments deleted successfully" });
  } catch (error) {
    res.status(500).json({ message: "Failed to delete Assessments", error });
  }
};

export const validateVivaShedule = async (req, res) => {
  try {
    const { date, timeDuration } = req.body; // Assuming you have 'date' and 'timeDuration' fields in your request body

    // Convert timeDuration to minutes
    const timeDurationInMinutes = parseInt(timeDuration);

    // Find the appropriate research group(s)
    const researchGroups = await ResearchGroups.find();

    // Calculate viva start time
    const startTime = new Date(`${date}T09:00:00`);

    // Schedule viva for each research group
    for (let i = 0; i < researchGroups.length; i++) {
      const group = researchGroups[i];

      // Calculate viva time for the current group
      const vivaTime = new Date(
        startTime.getTime() + i * timeDurationInMinutes * 60000
      );

      // Update viva date and time for the current group
      group.vivaDate = date;
      group.vivaTime = vivaTime.toLocaleTimeString("en-US", { hour12: false });

      // Save the changes to the database
      await group.save();
    }

    res.status(200).json({ message: "Viva schedule updated successfully" });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Internal Server Error" });
  }
};


export const getResearchViaPM = async (req, res) => {
  try {
    const researchGroups = await ResearchGroups.find();

    console.log(researchGroups);
    res.status(200).json(researchGroups);
  } catch (err) {
    res.status(500).json({ message: "Failed to get Research group data", err });
  }
};
