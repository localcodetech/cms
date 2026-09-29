import express from "express";
import cors from "cors";
import morgan from "morgan";
import router from "./routes/userRoute.js";
import postRouter from "./routes/postRoute.js"
const app = express();

app.use(express.json())

app.use(cors({
    origin: ["https://cms-flame-kappa.vercel.app", "http://localhost:5173"],
    methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
    allowedHeaders: ["Content-Type", "Authorization"],
}));
app.use(morgan("dev"));
app.use("/api/auth", router)
 app.use("/api/posts", postRouter)


app.get("/",(req,res)=>{res.status(200).json({message: "ok"})})

// anything thrown past a route/middleware: JSON instead of Express's HTML page
app.use((err, req, res, next) => {
    console.error(err)
    res.status(err.status || 500).json({ error: err.message || "internal server error" })
})



export default app;