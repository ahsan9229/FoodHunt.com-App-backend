import { Request , Response } from "express";
import User from "../Models/user";


const getCurrentUser= async(req: Request, res : Response)=>{

    try {

        const currentUSer = await User.findOne({_id: req.userId });

        if(!currentUSer){
            return res.status(404).json({message:"User not found"})
        }

        res.json(currentUSer);
        
    } catch (error) {

        console.log(error);
        return res.status(500).json({message:"Something went Wrong ...."})

        
    }
}


const createCurrentUser = async(req: Request, res : Response)=>{

    //1. Check if the User Exists
    //2. Create the use if doesn't exist
    //3. return the user object to the calling client

    try {
        const {auth0Id} =req.body;
        const existingUser = await User.findOne({auth0Id})

        if (existingUser){
          
            return res.status(200).send();

        }
        const newUser = new User(req.body);
        await newUser.save();
        res.status(201).json(newUser.toObject());
        
    } catch (error) {
        console.log(error);
        res.status(500).json({mesage : "Error creating user"});
        
    }

}

const updateCurrentUser =async (req:Request , res : Response)=>{
    try {
        const {name,phone,addressLine,city,country} =req.body;
        const user= await User.findById(req.userId);
        if(!user){
            return res.status(404).json({message:"User not found"})
        }
       user.name =name;
       user.phone =phone;
       user.addressLine= addressLine;
       user.city =city;
       user.country =country;

       await user.save();
       res.send(user);


        
    } catch (error) {
        console.log(error);
        res.status(500).json({message:"Error updating user"});        
    }
}
export default {
    createCurrentUser,updateCurrentUser,getCurrentUser
}