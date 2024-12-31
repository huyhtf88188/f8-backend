import express from "express";
import mongoose from "mongoose";
import User from "./models/user.js";
import Products from "./models/products.js";

const app = express();

app.use(express.json());

mongoose.connect("mongodb://127.0.0.1:27017/f8_backend");

app.get("/products", async (req, res) => {
  try {
    const result = await Products.find();
    return res.status(200).json({
      message: "Lay danh sach san pham thanh cong",
      result,
    });
  } catch (error) {
    return res.status(400).json({
      error,
    });
  }
});

app.get("/products/:id", async (req, res) => {
  try {
    const id = req.params.id;
    console.log(id);
    const result = await Products.find({ _id: id });
    return res.status(200).json({
      message: "lấy sản phẩm theo id thành công",
      result,
    });
  } catch (error) {
    return res.status(400).json({
      error,
    });
  }
});

app.post("/products", async (req, res) => {
  try {
    const result = await Products.create(req.body);
    return res.status(201).json({
      message: "Tao san pham thanh cong",
      result,
    });
  } catch (error) {
    return res.status(400).json({
      error,
    });
  }
});

app.delete("/products/:id", async (req, res) => {
  try {
    const id = req.params.id;
    const result = await Products.findByIdAndDelete({ _id: id });
    return res.status(200).json({
      message: "Xoa san pham thanh cong",
      result,
    });
  } catch (error) {
    return res.status(400).json({
      error,
    });
  }
});

app.patch("/products/:id", async (req, res) => {
  try {
    console.log(req);
    const id = req.params.id;
    const result = await Products.findByIdAndUpdate({ _id: id }, req.body, {
      new: true,
    });
    return res.status(200).json({
      message: "update thành công",
      result,
    });
  } catch (error) {
    return res.status(400).json({
      error,
    });
  }
});

app.delete("/products", async (req, res) => {
  try {
    const result = await Products.deleteMany({ _id: { $in: req.body.id } });
    return res.status(200).json({
      message: "xóa thành công các sản phẩm trên",
      result,
    });
  } catch (error) {
    return res.status(400).json({
      error,
    });
  }
});

app.post("/products/addMany", async (req, res) => {
  try {
    console.log(req.body.newProduct);
    const result = await Products.insertMany(req.body.newProduct);
    return res.status(201).json({
      message: "tao nhiều sản phẩm thành công",
      result,
    });
  } catch (error) {
    return res.status(400).json({
      error,
    });
  }
});

app.listen(3000, () => {});
