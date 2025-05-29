import { FoodCart } from "../models/cart.model";
import { FoodItem } from "../models/item.model"

export const getItem = async (req, res)=>{
    try{
        await FoodItem.find();
        return res.status(200).json({
            message: "Items fetched successfully",
            success: true,
            data: items
        });
    }catch(e){
        console.error(e);
        return res.status(500).json({
            message: "Internal server error",
            success: false
        });
    }
};

// 1. Filter by tags only
export const getItemsByTag = async (req, res) => {
  try {
    let { tags } = req.query;

    if (!tags) {
      return res.status(400).json({
        message: "No tags provided",
        success: false,
      });
    }

    const tagsArray = tags.split(",").map(tag => tag.trim().toLowerCase());

    const items = await FoodItem.find({
      productTag: { $all: tagsArray }, // all tags must be present
    });

    return res.status(200).json({
      message: "Items filtered by tags fetched successfully",
      success: true,
      data: items,
    });
  } catch (e) {
    console.error(e);
    return res.status(500).json({
      message: "Internal server error",
      success: false,
    });
  }
};

// 2. Filter by category only
export const getItemsByCategory = async (req, res) => {
  try {
    let { categories } = req.query;

    if (!categories) {
      return res.status(400).json({
        message: "No categories provided",
        success: false,
      });
    }

    const categoriesArray = categories.split(",").map(cat => cat.trim().toLowerCase());

    const items = await FoodItem.find({
      category: { $all: categoriesArray }, // all categories must be present
    });

    return res.status(200).json({
      message: "Items filtered by categories fetched successfully",
      success: true,
      data: items,
    });
  } catch (e) {
    console.error(e);
    return res.status(500).json({
      message: "Internal server error",
      success: false,
    });
  }
};

// 3. Filter by both tags and categories
export const getItemsByTagAndCategory = async (req, res) => {
  try {
    let { tags, categories } = req.query;

    if (!tags || !categories) {
      return res.status(400).json({
        message: "Both tags and categories must be provided",
        success: false,
      });
    }

    const tagsArray = tags.split(",").map(t => t.trim().toLowerCase());
    const categoriesArray = categories.split(",").map(c => c.trim().toLowerCase());

    const items = await FoodItem.find({
      productTag: { $all: tagsArray },
      category: { $all: categoriesArray },
    });

    return res.status(200).json({
      message: "Items filtered by tags and categories fetched successfully",
      success: true,
      data: items,
    });
  } catch (e) {
    console.error(e);
    return res.status(500).json({
      message: "Internal server error",
      success: false,
    });
  }
};

export const addItem = async (req, res) => {
  try {
    let { name, itemImageURL, itemPrice, timeToDeliver, category, productTag } = req.body;

    if (!name || !itemImageURL || !itemPrice || !timeToDeliver) {
      return res.status(400).json({
        message: "Missing required fields: name, itemImageURL, itemPrice, or timeToDeliver",
        success: false,
      });
    }


    category = category
      ? category.split(",").map(cat => cat.trim().toLowerCase()).filter(Boolean)
      : [];
    productTag = productTag
      ? productTag.split(",").map(tag => tag.trim().toLowerCase()).filter(Boolean)
      : [];


    const allowedCategories = ['vegetarian', 'vegan', 'glutenfree'];
    const allowedTags = ['salads', 'bowls', 'wraps', 'plates', 'drinks'];


    const invalidCategories = category.filter(cat => !allowedCategories.includes(cat));
    if (invalidCategories.length > 0) {
      return res.status(400).json({
        message: `Invalid category values: ${invalidCategories.join(", ")}`,
        success: false,
      });
    }

    const invalidTags = productTag.filter(tag => !allowedTags.includes(tag));
    if (invalidTags.length > 0) {
      return res.status(400).json({
        message: `Invalid productTag values: ${invalidTags.join(", ")}`,
        success: false,
      });
    }

    const newItem = await FoodItem.create({
      name: name.trim(),
      itemImageURL: itemImageURL.trim(),
      itemPrice,
      timeToDeliver,
      category,
      productTag,
    });

    return res.status(201).json({
      message: "Item added successfully",
      success: true,
      data: newItem,
    });
  } catch (error) {
    console.error(error);
    return res.status(500).json({
      message: "Internal server error",
      success: false,
    });
  }
};

export const addToCart = async (req, res) => {
  try {
    const userId = req.id; // Assuming user ID is in req.id (from auth middleware)
    const { productId, quantity } = req.body;

    if (!productId || !quantity || quantity < 1) {
      return res.status(400).json({
        message: "Product ID and a valid quantity are required",
        success: false,
      });
    }

    // Verify product exists
    const product = await FoodItem.findById(productId);
    if (!product) {
      return res.status(404).json({
        message: "Product not found",
        success: false,
      });
    }


    let cart = await FoodCart.findOne({ user: userId });

    if (!cart) {

      cart = new FoodCart({
        user: userId,
        items: [{ product: productId, quantity }],
      });
    } else {

      const itemIndex = cart.items.findIndex(
        (item) => item.product.toString() === productId
      );

      if (itemIndex > -1) {

        cart.items[itemIndex].quantity += quantity;
      } else {

        cart.items.push({ product: productId, quantity });
      }
    }

    await cart.save();

    const populatedCart = await cart.populate("items.product");

    return res.status(200).json({
      message: "Item added to cart successfully",
      success: true,
      cart: populatedCart,
    });
  } catch (e) {
    console.error(e);
    return res.status(500).json({
      message: "Internal server error",
      success: false,
    });
  }
};