import bcrypt from "bcryptjs/dist/bcrypt.js";
import User from "../model/user.model.js";



export const signup=async (req,res)=>{
    try {
        const {fullname,email,password}=req.body;//get the data from postman body
const user=await User.findOne({email});
if(user){
    return res.status(400).json({message:"User already Exists"})
}
const hashPassword=await bcrypt.hash(password,10) //bcrypt use to unreadable(hash) password in database
const createdUser=new User({
   fullname:fullname,
   email: email,
   password:hashPassword,
});
await createdUser.save()
res.status(201).json({message:"User Created Successfully",user:{
_id: createdUser._id,
fullname: createdUser.fullname,
email: createdUser.email,

}});

    } catch (error) {
        console.log("Error :"+error.message);
        res.status(500).json({message:"Internal Server Error"})

    }
};


// Login function
export const login = async (req, res) => {
    try {
      const { email, password } = req.body;
  
      // Check if the user exists
      const user = await User.findOne({ email });
  
      // If no user is found, return an error
      if (!user) {
        return res.status(400).json({ message: "Invalid username or password" });
      }
  
      // Compare the provided password with the stored hashed password
      const isMatch = await bcrypt.compare(password, user.password);
  
      // If password doesn't match, return an error
      if (!isMatch) {
        return res.status(400).json({ message: "Invalid username or password" });
      }
  
      // If login is successful, return the user data
      res.status(200).json({
        message: "Login successful",
        user: {
          _id: user._id,
          fullname: user.fullname,
          email: user.email,
        },
      });
    } catch (error) {
      // Log the error for debugging purposes
      console.log("Error: " + error.message);
      res.status(500).json({ message: "Internal server error" });
    }
  };
  