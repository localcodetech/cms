import express from "express";
import cors from "cors";
import morgan from "morgan";
import router from "./routes/userRoute.js";

const app = express();

app.use(express.json())

app.use(cors());
app.use(morgan("dev"));
app.use("/api/auth", router)
 


app.get("/",(req,res)=>{res.status(200).json({message: "ok"})})



export default app;