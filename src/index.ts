import express , {Request,Response} from "express";
import cors from "cors";
import "dotenv/config";
import mongoose from "mongoose";
import MyUserRoutes from './Routes/MyUserRoutes'
import {v2 as cloudinary} from "cloudinary";
import MyRestaurantRoute from "./Routes/MyRestaurantRoute";
import RestaurantRoute from './Routes/RestaurantRoute'
import OrderRoute from './Routes/OrderRoute';


mongoose.connect(process.env.MONGODB_CONNECTION_STRING as string).then(()=>{
    console.log("Connected to Database")
});

cloudinary.config({
    cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
    api_key: process.env.CLOUDINARY_API_KEY,
    api_secret: process.env.CLOUDINARY_API_SECRET

})


const  app =express();

app.use(cors());
app.use("/api/order/checkout/webhook", express.raw({ type: "*/*" }));

app.use(express.json());
app.get('/Health',async (req:Request ,res:Response)=>{

    res.send({message: "Health ok!"})
})

///   api/my/user
app.use ("/api/my/user" , MyUserRoutes);
app.use ("/api/my/restaurant" , MyRestaurantRoute );
app.use('/api/restaurant', RestaurantRoute);
app.use('/api/order', OrderRoute );


app.listen(7000, ()=>{

    console.log("Server Started on localhost:7000")
})

