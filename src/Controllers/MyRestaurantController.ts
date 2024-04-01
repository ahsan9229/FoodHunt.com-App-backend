import {Request,Response} from "express";
import Restaurant from "../Models/restaurant";
import cloudinary from 'cloudinary';
import mongoose from "mongoose";


const GetMyResturant= async (req:Request, res: Response)=>{


    try {
        
        const restaurant = await Restaurant.findOne({user:req.userId})

        if(!restaurant){
            return res.status(404).json({message: "restaurant not found"})
        }

        res.json(restaurant);

    } catch (error) {

        console.log(error);
        res.status(500).json({message:"Error fetching the restaurant"})
       
        
    }
}

const createMyRestaurant = async (req: Request , res: Response )=>{


    try {

        //Check if User have existing Restaurant in systme 

        const existingRestaurant = await Restaurant.findOne({
            user:req.userId
        })

       if (existingRestaurant ){
        return res.status(409).json({message: "User restaurant already exists"})
       }

      // Image Data receive here/ Multer Added FILE Object in request. 

    //    const image = req.file as Express.Multer.File;
    //    const base64Image = Buffer.from(image.buffer).toString("base64");
    //    const dataURI= `data:${image.mimetype};base64,${base64Image}`;

    //    const uploadResponse = await cloudinary.v2.uploader.upload(dataURI);

    const imageUrl = await uploadImage(req.file as Express.Multer.File)
       // CLoudinary Image response will be received in "uploadResponse"

       //Create new Restaurant 
       const restaurant = new Restaurant(req.body); 
       restaurant.imageUrl = imageUrl;
       restaurant.user = new mongoose.Types.ObjectId (req.userId);
       restaurant.lastUpdated = new Date();
       await restaurant.save();
    //   const imageUrl = await uploadImage(req.file as Express.Multer.File);

    // const restaurant = new Restaurant(req.body);
    // restaurant.imageUrl = imageUrl;
    // restaurant.user = new mongoose.Types.ObjectId(req.userId);
    // restaurant.lastUpdated = new Date();
    // await restaurant.save();

       res.status(201).send(restaurant)


        
    } catch (error) {
        console.log(error);
        res.status(500).json({message:"Something went wrong!."})
        
    }
}

const UpdateMyRestaurant = async (req:Request , res:Response)=>{
try {

    const restaurant = await Restaurant.findOne({user: req.userId,})

    if (!restaurant){
        return res.status(400).json({message:'restaurant not found'})
    }

    restaurant.restaurantName = req.body.restaurantName;
    restaurant.city = req.body.city;
     restaurant.country = req.body.country;
      restaurant.deliveryPrice = req.body.deliveryPrice;
       restaurant.estimatedDeliveryTime= req.body.estimatedDeliveryTime;
        restaurant.cuisines= req.body.cuisines;
         restaurant.menuItems= req.body.menuItems;
         restaurant.lastUpdated= new Date();


         if(req.file){
            
 const imageUrl = await uploadImage(req.file as Express.Multer.File)
  restaurant.imageUrl = imageUrl;
         }

         await restaurant.save();
         res.status(200).send(restaurant);
        

    
} catch (error) {
    console.log(error)
    res.status(500).json({message:"Something went wrong!"})
    
}
}

const uploadImage = async (file: Express.Multer.File) => {
  const image = file;
  const base64Image = Buffer.from(image.buffer).toString("base64");
  const dataURI = `data:${image.mimetype};base64,${base64Image}`;

  const uploadResponse = await cloudinary.v2.uploader.upload(dataURI);
  return uploadResponse.url;
}

export default {
    createMyRestaurant,GetMyResturant,UpdateMyRestaurant,
}