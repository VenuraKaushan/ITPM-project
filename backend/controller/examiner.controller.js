import ResearchGroups from "../model/group.model.js"
import User from "../model/users.model.js";
import bcryptjs from 'bcryptjs';
import jwt from "jsonwebtoken";
import "dotenv/config";
import Assessments from "../model/assestment.model.js";
import MarkingRubrics from "../model/rubrics.model.js";
import Marks from "../model/marks.model.js";

export const getResearchGroupByExaminer = async (req, res) => {
    try {
        const allResearch = await ResearchGroups.find();

        res.status(200).json(allResearch)

    } catch (err) {
        res.status(500).json({ message: "Failed to get Research groups", err });
    }

}

export const changePassword = async (req, res) => {
    try {

        const _id = req.params.id;

        const salt = await bcryptjs.genSalt(10);
        const hashedPassword = await bcryptjs.hash(req.body.newPassword, salt);

        const newPassword = {
            password: hashedPassword,
            isPasswordChanged: true,
        };

        const newPass = await User.findByIdAndUpdate(_id, newPassword, {
            new: true,
        });

        res.status(200).json(newPass);

    } catch (err) {
        console.log(err.message)
        res.status(500).json({ message: "Failed to Change Password", err });

    }
}

export const getRubrics = async (req, res) => {
    try {
        const allRubrics = await MarkingRubrics.find();

        res.status(200).json(allRubrics)

    } catch (err) {
        res.status(500).json({ message: "Failed to get Marking rubrics", err });
    }
}

export const submitMarks = async (req, res) => {

    try {
        const _id = req.body.marksID

  
        const updateFields = {
            groupID: req.body.groupID,
            student: req.body.student
          }

        console.log(updateFields)

        const saveMarks = await Marks.findByIdAndUpdate(_id, updateFields, {
            new: true,
        });

        res.status(201).json(saveMarks);


    } catch (err) {
        console.log(err.message)

        res.status(500).json({ message: "Failed to add Marks", err });
    }
}

export const getExistingMarks = async (req, res) => {
    try {
        const _id = req.params.id;

        const existinMarks = await Marks.findOne({ groupID: _id });

        res.status(201).json(existinMarks);
    } catch (err) {
        console.log(err.message)

        res.status(500).json({ message: "Failed to get existing Marks", err });
    }
}