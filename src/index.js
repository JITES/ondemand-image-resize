import express from "express";
import router from "./routes/resize.route.js";
import dotenv from 'dotenv';

dotenv.config();

const port = process.env.PORT || 3000;

const application = express();

application.use(express.json());
application.use(express.urlencoded({ extended: true }));

application.use('/resize', router)

application.listen(port, () => {
    console.log(`🚀 CloudCorp is running on port ${port}`);
}); 

export default application; 