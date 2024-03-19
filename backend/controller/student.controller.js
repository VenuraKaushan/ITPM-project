import User from "../model/users.model.js";
import bcryptjs from 'bcryptjs';
import jwt from "jsonwebtoken";
import "dotenv/config";
import ResearchGroups from "../model/group.model.js"

//student login function
export const studentLogin = async (req,res) =>{
    const { email, password } = req.body;
    console.log(email, password);
  
    User.find({ email: email })
      .then((data) => {
        if (data.length > 0) {
          data = data[0];
        
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
              specialization : data.specialization,
              regNo : data.regNo
            };
  
            //   sends the user details
            res.status(200).json(userDetails);
  
          } else {
            throw new Error("Password is wrong");
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


//generate group Id
const generateGroupID= async () => {
  //get last group object, if there is a group, then return that group object, otherwise return empty array
  const lastGroupDetails = await ResearchGroups.find().sort({ _id: -1 }).limit(1);

  //check if the result array is empty or not, if its empty then return first Group ID
  if (lastGroupDetails.length == 0) {
    return "Y4_RSR_GRP-001";
  }

  //if array is not null, last get last group Id
  const groupId = lastGroupDetails.map((data) => {
    return data.id;
  });

  //then we get the Integer value from the last part of the ID
  const oldGroupeId = parseInt(groupId[0].split("-")[1]);

  const newGroupeId = oldGroupeId + 1; //then we add 1 to the past value

  return `Y4_RSR_GRP-${newGroupeId}`; //return new group ID
};


export const regResearchGroup =async (req,res)=>{

  const customGroupId = await generateGroupID();

  try{
    console.log(req.body.batch)
    const newGroup = new ResearchGroups({
      id : customGroupId,
      leader : req.body.leaderDetails,
      members : req.body.memberDetails,
      title : req.body.projectDetails.title,
      area: req.body.projectDetails.researchArea,
      category: req.body.projectDetails.projectCategory,
      supervisorName: req.body.projectDetails.supervisorName,
      coSupervisorName: req.body.projectDetails.coSupervisorName,
      batch: req.body.batch
    })

    const saveGroup = await newGroup.save();

    res.status(201).json(saveGroup);
  }catch(err){
    res.status(500).json({message: "Failed to add group",err});
  }
};