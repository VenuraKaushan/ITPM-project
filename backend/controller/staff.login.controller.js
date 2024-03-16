import User from "../model/users.model.js";
import bcryptjs from 'bcryptjs';
import jwt from "jsonwebtoken";
import "dotenv/config";


export const staffLogin = async (req, res) => {
  const { email, password } = req.body;
  console.log(email, password);

  User.find({ email: email })
    .then((data) => {
      if (data.length > 0) {
        data = data[0];
      
        //  compare database password and user entered password and role
        if (bcryptjs.compareSync(password, data.password) && (data.role === "COORDINATOR")) {
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
          };

          //   sends the user details asd
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