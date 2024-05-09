import User from "../model/users.model.js";
import bcryptjs from 'bcryptjs';
import jwt from "jsonwebtoken";
import "dotenv/config";
import ResearchGroups from "../model/group.model.js"
import Assessments from "../model/assestment.model.js";
import path from 'path';
import Tesseract from 'tesseract.js';
import Marks from "../model/marks.model.js";


//student login function
export const studentLogin = async (req, res) => {
  const { email, password } = req.body;
  console.log(email);
  console.log(password);

  User.find({ email: email })
    .then((data) => {
      if (data.length > 0) {
        data = data[0];

        if (data.isPasswordChanged == false) {
          if (password == data.password) {
            // create access Token
            const accessToken = jwt.sign(
              { _id: data._id, role: data.role },
              process.env.SECRET_KEY,
              { expiresIn: 24 * 60 * 60 }
            ); //access Token will expires in 1 day

            //   set access Token as a http only cookie
            res.cookie("accessToken", accessToken, { httpOnly: true, maxAge: 24 * 60 * 60 * 1000, secure: false });//this cookie expires in 1 day

            //   create user details
            const userDetails = {
              _id: data._id,
              name: data.name,
              email: data.email,
              role: data.role,
              specialization: data.specialization,
              regNo: data.regNo,
              isPasswordChanged: data.isPasswordChanged
            };

            //   sends the user details
            res.status(200).json(userDetails);


          }
        }
        else {
          //  compare database password and user entered password and role
          if (bcryptjs.compareSync(password, data.password) && (data.role === "STUDENT")) {
            console.log("work")

            // create access Token
            const accessToken = jwt.sign(
              { _id: data._id, role: data.role },
              process.env.SECRET_KEY,
              { expiresIn: 24 * 60 * 60 }
            ); //access Token will expires in 1 day

            //   set access Token as a http only cookie
            res.cookie("accessToken", accessToken, { httpOnly: true, maxAge: 24 * 60 * 60 * 1000, secure: false });//this cookie expires in 1 day

            //   create user details
            const userDetails = {
              _id: data._id,
              name: data.name,
              email: data.email,
              role: data.role,
              specialization: data.specialization,
              regNo: data.regNo
            };

            //   sends the user details
            res.status(200).json(userDetails);

          } else {
            throw new Error("Password is wrong");
          }
        }
      } else {
        throw new Error("Does not exist this user");
      }
    })
    .catch((error) => {
      console.log(error.message)
      res.status(404).json({ error: error.message });
    });
};

//logout 
export const studentLogout = (req, res) => {
  res.cookie("accessToken", "", { maxAge: 1 });
  res.status(200).json({});
};

//generate group Id
const generateGroupID = async () => {
  //get last group object, if there is a group, then return that group object, otherwise return empty array
  const lastGroupDetails = await ResearchGroups.find().sort({ _id: -1 }).limit(1);

  //check if the result array is empty or not, if its empty then return first Group ID
  if (lastGroupDetails.length == 0) {
    return "Y4_RSR_GRP-1";
  }

  //if array is not null, last get last group Id
  const groupId = lastGroupDetails.map((data) => {
    return data.groupID;
  });

  //then we get the Integer value from the last part of the ID
  const oldGroupeId = parseInt(groupId[0].split("-")[1]);

  const newGroupeId = oldGroupeId + 1; //then we add 1 to the past value

  return `Y4_RSR_GRP-${newGroupeId}`; //return new group ID
};


export const regResearchGroup = async (req, res) => {
  const customGroupId = await generateGroupID();

  try {

    // Check if leader email already exists in the database
    const existingLeader = await ResearchGroups.findOne({ 'leader.registrationNumber': req.body.leaderDetails.registrationNumber });
    if (existingLeader) {
      return res.status(400).json({ message: 'Leader already belongs to a research group' });
    }

    // Check if any member email already exists in the database
    for (const member of req.body.memberDetails) {
      const existingMember = await ResearchGroups.findOne({ 'members.registrationNumber': member.registrationNumber });
      if (existingMember) {
        return res.status(400).json({ message: 'Member already belongs to a research group' });
      }
    }

    const newGroup = new ResearchGroups({
      groupID: customGroupId,
      leader: req.body.leaderDetails,
      members: req.body.memberDetails,
      title: req.body.projectDetails.title,
      area: req.body.projectDetails.researchArea,
      category: req.body.projectDetails.projectCategory,
      supervisorName: req.body.projectDetails.supervisorName,
      coSupervisorName: req.body.projectDetails.coSupervisorName,
      batch: req.body.batch,
      isPublish: false
    });

    const saveGroup = await newGroup.save();

    res.status(201).json(saveGroup);
  } catch (err) {
    console.log(err.message);
    res.status(500).json({ message: 'Failed to add group', err });
  }
};

//get research by leader
export const getResearchByLeader = async (req, res) => {

  const loggedUser = req.body;

  try {

    const research = await ResearchGroups.find({ 'leader.registrationNumber': loggedUser.regNo })

    res.status(200).json(research)

  } catch (err) {
    res.status(500).json({ message: "Failed to get research", err });
  }
}

export const getAssessment = async (req, res) => {
  try {
    const assessments = await Assessments.find()

    res.status(200).json(assessments);

  } catch (err) {
    res.status(500).json({ message: "Failed to get Assessments data", err });
  }
}

export const uploadAssessmentDoc = async (req, res) => {
  try {
    const _id = req.params.id;
    // console.log(req.body); // Check if body contains any data
    console.log(req.file);

    return res.status(200).json(req.file);

  } catch (error) {
    console.log(error.message);
    return res.status(500).json({ message: 'Failed to upload assessment.', error: error.message });
  }
};

export const submitAssessment = async (req, res) => {

  try {
    const _id = req.params.id;

    const updateFields = {
      comment: req.body.comment,
      ansDoc: `/${req.body.submitDoc.path}`,
    }

    console.log(updateFields)

    const uploadAssessment = await Assessments.findByIdAndUpdate(_id, updateFields, {
      new: true,
    });

    res.status(200).json(uploadAssessment);

  } catch (err) {
    console.log(err.message);
    res.status(500).json({ message: "Failed to Upload Assessment", err });

  }
}

export const getSupervisors = async (req, res) => {
  try {
    const supervisors = await User.find({ role: "SUPERVISOR" })

    res.status(200).json(supervisors);

  } catch (err) {
    res.status(500).json({ message: "Failed to get supervisors data", err });
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
    res.status(500).json({ message: "Failed to Change Password", err });

  }
}

export const scanImage = async (req, res) => {
  try {
    const image = req.file; // Check if body contains any data

    if (!req.file) {
      return res.status(400).json({ message: 'No image uploaded' });
    }

    const { data: { text } } = await Tesseract.recognize(req.file.path, 'eng');
    console.log({ text });

    // Possible variations of payment confirmation texts
    const paymentConfirmationTexts = [
      "payment successful",
      "payment successfull",
      "payment successful!",
      "payment successfull!",
      "payment completed",
      "PAYMENT SUCCESSFUL"
      // Add more variations as needed
    ];

    // Check if any of the variations match the recognized text
    const isPaymentSuccessful = paymentConfirmationTexts.some(variation =>
      text.toLowerCase().includes(variation)
    );

    console.log("Payment Successful:", isPaymentSuccessful);

    res.json({ image, isPaymentSuccessful });

  } catch (err) {
    console.log(err.message);
    res.status(500).json({ message: 'Internal server error' });
  }
};

export const publishResearch = async (req, res) => {

  try {
    const _id = req.params.id;

    const updateFields = {
      ScopusIndex : req.body.scopusIndexing,
      hIndex: req.body.hindex,
      image: req.body.image.path,
      isPublish: true
    }

    console.log(updateFields)

    const publisheResearch = await ResearchGroups.findByIdAndUpdate(_id, updateFields, {
      new: true,
    });

    res.status(200).json(publisheResearch);

  } catch (err) {
    console.log(err.message);
    res.status(500).json({ message: "Failed to publish Research", err });

  }
}

export const getMarks = async (req, res) => {
  try {
    const _id = req.params.id;

    console.log(_id)

    const studentMarks = await Marks.findOne({ "student.registrationNumber": _id });

    console.log(studentMarks)
    res.status(200).json(studentMarks);
  } catch (err) {
    res.status(500).json({ message: "Failed to get marks data", err });
  }
};


