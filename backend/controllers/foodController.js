import foodModel from "../models/foodModel.js";
import fs from "fs";

// add food item
const addFood = async (req, res) => {
  let image_filename = `${req.file.filename}`;

  const food = new foodModel({
    name: req.body.name,
    description: req.body.description,
    price: req.body.price,
    image: image_filename,
    category: req.body.category,
  });
  try {
    await food.save();
    res.json({ success: true, message: "Food Added" });
  } catch (err) {
    console.log(err);
    res.json({ success: false, message: "Error" });
  }
};

// all food list
const listFood = async (req, res) => {
  try {
    const foods = await foodModel.find({});
    res.json({ success: true, data: foods });
  } catch (error) {
    console.log(error);
    res.json({ success: false, message: "Error" });
  }
};
// remove food item
const removeFood = async (req, res) => {
  try {
    const food = await foodModel.findById(req.body.id);
    fs.unlink(`uploads/${food.image}`, () => {});

    await foodModel.findByIdAndDelete(req.body.id);
    res.json({ success: true, message: "Food Removed" });
  } catch (error) {
    console.log(error);
    res.json({ success: false, message: "Error" });
  }
};

// edit food item
const editFood = async (req, res) => {
  try {
    const { id, name, description, price, category } = req.body;
    if (req.file) {
      const image_filename = req.file.filename;

      const food = await foodModel.findById(id);
      fs.unlink(`uploads/${food.image}`, (err) => {
        if (err) {
          console.error("Error deleting old image:", err);
        }
      });
      await foodModel.findByIdAndUpdate(id, {
        name,
        description,
        price,
        image: image_filename,
        category,
      });

      res.json({
        success: true,
        message: "Product Updated",
      });
    } else {
      await foodModel.findByIdAndUpdate(id, {
        name,
        description,
        price,
        category,
      });

      res.json({
        success: true,
        message: "Product Updated",
      });
    }
  } catch (error) {
    console.error("Error editing food:", error);
    res.json({ success: false, message: "Edit Error" });
  }
};

export { addFood, listFood, removeFood, editFood };
