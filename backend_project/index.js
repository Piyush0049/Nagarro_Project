import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import connectDB from "./utils/db.js";
import userRoute from "./routes/user.routes.js"
import itemRoute from "./routes/item.routes.js"
import cartRoute from "./routes/cart.routes.js"


dotenv.config();

const app = express();
const PORT = process.env.PORT || 8080;


connectDB()
  .then(() => {
    console.log("Connected to MongoDB");
  })
  .catch((err) => {
    console.error(" MongoDB connection failed:", err);
    process.exit(1);
  });

const corsOptions = {
  origin: "http://localhost:5173", 
  credentials: true, 
};

// Middleware
app.use(cors(corsOptions));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));


app.use((err, req, res, next) => {
  console.error("Unhandled error:", err.stack);
  res.status(500).json({ message: "Internal Server Error", success: false });
});

//api
app.use("/api/v1/user", userRoute);
app.use("/api/v1/product", itemRoute);
app.use("/api/v1/cart", cartRoute);

app.listen(PORT, () => {
  console.log(`Server running at PORT ${PORT}`);
});
