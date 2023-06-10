import User from "../models/userModel.js";
import Products from "../models/productModel.js";

export async function getProducts(req, res) {
  try {
    const search = req.query.search ?? "";
    const category = req.query.category ?? "";
    const products = await Products.find({
      $or: [
        { name: new RegExp(search, "i") },
        { category: new RegExp(category, "i") },
        { category: new RegExp(search, "i") },
      ],
    }).lean();
    res.json({ error: false, products });
  } catch (error) {
    res.json({ error: error.message });
  }
}

export async function addProduct(req, res) {
  try {
    const image = req.file;
    const product = await Products.create({ ...req.body, image });
    res.json({ error: false });
  } catch (error) {
    res.json({ error: error.message });
  }
}

export async function getItem(req, res) {
  try {
    const item = await Products.findById(req.params.id);
    let user;
    if (item) {
      user = await User.findById(item.userId);
    }
    res.json({ error: false, item, user });
  } catch (error) {
    res.json({ error: error.message });
  }
}

export async function getCategories(req, res) {
  try {
    const categories = await Products.aggregate([
      { $group: { _id: "$category" } },
    ]);
    res.json({ error: false, categories });
  } catch (error) {
    res.json({ error: error.message });
  }
}
