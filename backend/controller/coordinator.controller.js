import User from "../model/users.model.js";
import bcryptjs from 'bcryptjs';
import jwt from "jsonwebtoken";
import "dotenv/config";



const  generateMemberId = async () =>{
    //get last Member object, If there is a member, then return that member object, otherwise return empty array
    const lastMemberDetails = await User.find({role:"MEMBER"}).sort({_id : -1}).limit(1);
  
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
        role : "MEMBER",
      });
  
      console.log(newMember);
  
      const savedMember = await newMember.save();
      res.status(201).json(savedMember);
  
    }catch(error){
      console.log(error.message)
  
    }
  }