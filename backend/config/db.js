import mongoose from "mongoose";

export const connectDB = async () => {
  await mongoose
    .connect(
      "mongodb+srv://fcutkho1:fcutkho1@cluster0.gfyaujk.mongodb.net/food-del"
    )
    .then(() => console.log("DB Connected"));
};
