import express from "express";
import cors from "cors";
import { connectDB } from "./config/db.js";
import foodRoute from "./routes/foodRoute.js";
import userRoute from "./routes/userRoute.js";
import "dotenv/config";
import cartRoute from "./routes/cartRoute.js";
import orderRoute from "./routes/orderRoute.js";

// app config
const app = express();
const port = 4000;

// middleware

app.use(express.json());
app.use(cors());

// db conection

connectDB();

// api endpoints

app.use("/api/food", foodRoute);
app.use("/images", express.static("uploads"));
app.use("/api/user", userRoute);
app.use("/api/cart", cartRoute);
app.use("/api/order", orderRoute);

//

app.get("/", (req, res) => {
  res.send("API working");
});

app.listen(port, () => {
  console.log(`server started`);
});
