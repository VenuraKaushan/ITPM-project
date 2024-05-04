import User from "../model/users.model.js";
import Assessments from "../model/assestment.model.js";
import ResearchGroups from "../model/group.model.js";
import bcryptjs from 'bcryptjs';
import jwt from "jsonwebtoken";
import "dotenv/config";
import { generatePassword } from "../utils/passowrdGenerator.js";
import { sendGeneratedPassowrdToStaff } from "../mails/staff.mail.js";
import { sendGeneratedPassowrdToStudent } from "../mails/student.mail.js";

//generate Staff Member Custom ID
const generateMemberId = async () => {
  //get last Member object, If there is a member, then return that member object, otherwise return empty array
  const lastMemberDetails = await User.find({
    $or: [
      { role: "PROJECTMEMBER" },
      { role: "SUPERVISOR" },
      { role: "EXAMINER" },
      { role: "STUDENT" }
    ]
  }).sort({ _id: -1 }).limit(1);

  //check the result array is empty or not, if its empty then return first member ID
  if (lastMemberDetails.length == 0) {
    return "MEMBER-1";
  }

  //if array is not null, last get last member ID
  const memberId = lastMemberDetails.map((data) => {
    return data.id;
  });

  //then we get the integer value from the last part of the ID

  const oldMemberId = parseInt(memberId[0].split("-")[1]);

  const newMemberId = oldMemberId + 1; //then we add 1 to the past value

  return `MEMBER-${newMemberId}`; //return new Member ID
};




//Register STAFF member function
export const registerMember = async (req, res) => {
  try {
    const existingMember = await User.findOne({ email: req.body.email });

    if (existingMember) {
      console.log("User Exist");
      return res.status(409).json({ message: "Member already exists" });
    }
    const autoPassword = generatePassword();

    //generating the custom user ID
    const customId = await generateMemberId();

    //hashing the password
    const salt = await bcryptjs.genSalt(10);
    const hashedPassword = await bcryptjs.hash(autoPassword, salt);

    const newMember = new User({
      id: customId,
      name: req.body.name,
      email: req.body.email,
      phone: req.body.phone,
      specialization: req.body.specialization,
      role: req.body.role,
      password: hashedPassword,
    });

    const savedMember = await newMember.save();

    //send auto generate password to the user
    sendGeneratedPassowrdToStaff(newMember.name, newMember.email, hashedPassword)

    res.status(201).json(savedMember);

  } catch (error) {
    console.log(error.message)

  }
}

//Register Student Function
export const registerStudent = async (req, res) => {
  try {
    const existingStudent = await User.findOne({ email: req.body.email });

    if (existingStudent) {
      console.log("Student Exist");
      return res.status(409).json({ message: "Student already exists" });
    }

    const autoPassword = generatePassword();

    //generating the custom user ID
    const customId = await generateMemberId();

    //hashing the password
    const salt = await bcryptjs.genSalt(10);
    const hashedPassword = await bcryptjs.hash(autoPassword, salt);

    const newMember = new User({
      id: customId,
      name: req.body.name,
      email: req.body.email,
      regNo: req.body.regNo,
      specialization: req.body.specialization,
      batch: req.body.batch,
      semester: req.body.semester,
      role: "STUDENT",
      password: hashedPassword,
    });

    console.log(newMember);

    const savedStudent = await newMember.save();

    //send auto generate password to the user
    sendGeneratedPassowrdToStudent(newMember.name, newMember.email, hashedPassword)

    res.status(201).json(savedStudent);

  } catch (error) {
    console.log(error.message)

  }
}

//get all staff member details
export const getStaffMembers = async (req, res) => {
  try {
    const members = await User.find({
      $or: [
        { role: "PROJECTMEMBER" },
        { role: "SUPERVISOR" },
        { role: "EXAMINER" },
      ]
    })

    //If no members found, send a 404 status code with a message
    res.status(200).json(members);

  } catch (error) {
    res.status(500).json({ message: "Cannot Find Member" })

  }

}

//get all student details
export const getAllStudentDetails = async (req, res) => {
  try {
    const students = await User.find({ role: "STUDENT" })
    res.status(200).json(students);

  } catch (error) {
    res.status(500).json({ message: "Cannot find Students" })
  }
}

//edit the staff member details
export const updateStaffMember = async (req, res) => {

  const _id = req.params.id;

  const updateFields = {
    name: req.body.name,
    email: req.body.email,
    phone: req.body.phone,
    specialization: req.body.specialization,
    role: req.body.role,
  }

  try {
    const updateStaffMember = await User.findByIdAndUpdate(_id, updateFields, {
      new: true,
    });

    if (!updateStaffMember) {
      //If the worker is not found, send a 404 status code with a message
      return res.status(404).json({ message: " Worker Not Found" });
    }

    res.status(200).json(updateStaffMember); //Send the updated staff member as the response

  } catch (error) {
    res.status(500).json({ message: "Failed to update staff member", error });

  }

};

//edit the student details
export const updateStudentDetails = async (req, res) => {

  const _id = req.params.id;

  const updateFields = {
    name: req.body.name,
    email: req.body.email,
    regNo: req.body.regNo,
    specialization: req.body.specialization,
    batch: req.body.batch,
    semester: req.body.semester,
  }

  try {
    const updateStudent = await User.findByIdAndUpdate(_id, updateFields, {
      new: true,
    });

    if (!updateStudent) {
      //If the student is not found, send a 404 status code with a message
      return res.status(404).json({ message: " Student Not Found" });
    }

    res.status(200).json(updateStudent); //Send the updated Student as the response

  } catch (error) {
    res.status(500).json({ message: "Failed to update student", error });

  }

};

//Delete staff member function
export const deleteStaffMember = async (req, res) => {
  const _id = req.params.id;

  try {
    const deletedMember = await User.findByIdAndDelete(_id);

    if (!deletedMember) {
      // If the worker is not found, send a 404 status code with a message
      return res.status(404).json({ message: "Staff Member not found" });
    }

    res.status(200).json({ message: "Member deleted successfully" });
  } catch (error) {
    res.status(500).json({ message: "Failed to delete Member", error });
  }
};

//Delete Student function
export const deleteStudent = async (req, res) => {
  const _id = req.params.id;

  try {
    const deletedStudent = await User.findByIdAndDelete(_id);

    if (!deletedStudent) {
      // If the worker is not found, send a 404 status code with a message
      return res.status(404).json({ message: "Student not found" });
    }

    res.status(200).json({ message: "Student deleted successfully" });
  } catch (error) {
    res.status(500).json({ message: "Failed to delete Student", error });
  }
};

export const getGroupDetails = async (req, res) => {
  try {
    const groups = await ResearchGroups.find();
    const users = await User.find({ role: "PROJECTMEMBER" });

    // If no groups found, send 200 status code with a message
    if (!groups || groups.length === 0) {
      return res.status(200).json({ message: "No groups found" });
    }

    // Combine groups and users into a single array
    const responseData = [...groups, ...users];

    res.status(200).json(responseData);
  } catch (error) {
    res.status(500).json({ message: "Cannot find Group" });
  }
};

//Get View mark sheet tab group details
export const getViewMarkSheet = async (req, res) => {
  try {
    const getViewMarkSheetDetails = await ResearchGroups.find();
    res.status(200).json(getViewMarkSheetDetails);

  } catch (error) {
    res.status(500).json({ message: "Cannot find the group details" })

  }
}

//Get the Research paper group details

export const getResearchPaperDetails = async (req, res) => {
  try {
    const getResearchPaperDetails = await ResearchGroups.find();
    res.status(200).json(getResearchPaperDetails);

  } catch (error) {
    res.status(500).json({ message: "Cannot find the research group details" })
  }
}

//Add Assessment in Project Coordinator
export const addAssestment = async (req, res) => {

  try {
    const newAssestment = new Assessments({
      assestmentName: req.body.assessmentName,
      doc: req.body.assessmentUpload,
      deadline: req.body.deadline,
      specialization:req.body.specialization,
      semster:req.body.semester,
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

//Get the assessment details
export const getAssestment = async (req, res) => {
  try {
   
    const assesstment = await Assessments.find()

    res.status(200).json(assesstment);

  } catch (err) {
    console.log(err.message)
    res.status(500).json({ message: "Failed to get Assessments data", err });
  }
}

//Delete Assessment 
export const deleteAssestment = async (req, res) => {
  const _id = req.params.id;
  const assessmentName = req.params.assessmentName;

  try {

    console.log("controller delete")
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
  
//edit the Assessments details
export const updateAssestmentDetails = async (req, res) => {

  const _id = req.params.id;

  const updateFields = {
    assestmentName: req.body.assessmentName,
      doc: req.body.assessmentUpload,
      deadline: req.body.deadline,
      specialization:req.body.specialization,
      semster:req.body.semester,
      quesDoc: req.body.submitDoc.path,
      ansDoc:'Not a Answer',
      comment : "NaN"
  }

  try {
    const updateAssestmentDetails = await Assessments.findByIdAndUpdate(_id, updateFields, {
      new: true,
    });

    if (!updateAssestmentDetails) {
      //If the Assestment is not found, send a 404 status code with a message
      return res.status(404).json({ message: " Assestment Not Found" });
    }

    res.status(200).json(updateAssestmentDetails); //Send the updated Assestment as the response

  } catch (error) {
    res.status(500).json({ message: "Failed to update Assestment", error });

  }

};

















