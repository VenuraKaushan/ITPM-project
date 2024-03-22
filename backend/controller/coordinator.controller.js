import User from "../model/users.model.js";
import bcryptjs from 'bcryptjs';
import jwt from "jsonwebtoken";
import "dotenv/config";


//generate Staff Member Custom ID
const  generateMemberId = async () =>{
    //get last Member object, If there is a member, then return that member object, otherwise return empty array
    const lastMemberDetails = await User.find({ $or: [
      { role: "PROJECTMEMBER" },
      { role: "SUPERVISOR" },
      { role: "EXAMINER" },
      { role: "STUDENT" }
  ]}).sort({_id : -1}).limit(1);
  
    //check the result array is empty or not, if its empty then return first member ID
    if(lastMemberDetails.length == 0){
      return "MEMBER-1";
    }
  
    //if array is not null, last get last member ID
    const memberId = lastMemberDetails.map((data) =>{
      return data.id;
    });
  
    //then we get the integer value from the last part of the ID
  
    const oldMemberId = parseInt(memberId[0].split("-")[1]);
  
    const newMemberId = oldMemberId + 1; //then we add 1 to the past value
  
    return `MEMBER-${newMemberId}`; //return new Member ID
  };

 
  

//Register STAFF member function
export const registerMember = async(req,res) =>{
    try{
      const existingMember = await User.findOne({email:req.body.email});
  
      if(existingMember) {
        console.log("User Exist");
        return res.status(409).json({ message : "Member already exists"});
      }
  
      //generating the custom user ID
      const customId = await generateMemberId();
  
      console.log(customId);
  
      //hashing the password
    //   const salt = await bcryptjs.genSalt(10);
    //   const hashedPassword = await bcrypt.hash(re.body.password, salt);
  
  
    //   console.log(hashedPassword);
  
      const newMember = new User({
        id : customId,
        name: req.body.name,
        email: req.body.email,
        phone : req.body.phone,
        specialization : req.body.specialization,
        role : req.body.role,
      });
  
      console.log(newMember);
  
      const savedMember = await newMember.save();
      res.status(201).json(savedMember);
  
    }catch(error){
      console.log(error.message)
  
    }
  }

  //Register Student Function
  export const registerStudent = async(req,res) =>{
    try{
      console.log(req.body);
      const existingStudent = await User.findOne({email:req.body.email});
  
      if(existingStudent) {
        console.log("Student Exist");
        return res.status(409).json({ message : "Student already exists"});
      }
  
      //generating the custom user ID
      const customId = await generateMemberId();
  
      console.log(customId);
  
      //hashing the password
    //   const salt = await bcryptjs.genSalt(10);
    //   const hashedPassword = await bcrypt.hash(re.body.password, salt);
  
  
    //   console.log(hashedPassword);
  
      const newMember = new User({
        id : customId,
        name: req.body.name,
        email: req.body.email,
        regNo : req.body.regNo,
        specialization : req.body.specialization,
        batch : req.body.batch,
        semester : req.body.semester,
        role : "STUDENT",
      });
  
      console.log(newMember);
  
      const savedStudent = await newMember.save();
      res.status(201).json(savedStudent);
  
    }catch(error){
      console.log(error.message)
  
    }
  }

  export const getStaffMembers = async (req, res) => {
    try{
      const members = await User.find({ $or: [
        { role: "PROJECTMEMBER" },
        { role: "SUPERVISOR" },
        { role: "EXAMINER" },
      ]})

        //If no members found, send a 404 status code with a message
         res.status(200).json(members);
    
    }catch(error){
      res.status(500).json({message : "Cannot Find Member"})

    }

  }
  

